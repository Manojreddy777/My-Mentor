import React, { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import Colors from "../../constants/colors";
import styles from "../../styles/aim/aimFinbot.module.css";
import SideMenu from "../../components/sideMenu/sideMenu";
import Head from "../../components/head";
import FinbotHelper from "../../helper/aim/aimFinbot";
import io from "socket.io-client";

const PopUp = () => {
  const containerRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [textValue, setTextValue] = useState("");
  const [preText, setPreText] = useState("");
  const [nextId, setNextId] = useState(1);
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = io.connect("https://mentor.finari.co.in");
    socketRef.current = socket;
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);

      // Now it's safe to:
      const userId = socket.id;
      console.log("User ID:", userId);
      socket.emit("authenticate", userId);
    });
    fetchMessages();
    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await FinbotHelper.get({ chat_id: 1 });
      const modifiedData = response.map((step) => ({
        ...step,
        title: step.title.includes("${{username}}")
          ? step.title.replace("${{username}}", global.config.username)
          : step.title,
      }));
      setMessages(modifiedData);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  const clear = async () => {
    setMessages([]);
    fetchMessages();
    setNextId(1);   
    
    // Disconnect socket when clearing
    if (socketRef.current) {
      socketRef.current.disconnect();
    }
  };

  const insertChatHistory = async (chatbot_id, bot_response, user_response) => {
    try {
      const data = {
        user_name: global.config.username,
        chatbot_id,
        bot_response,
        user_response,
      };
      const response = await FinbotHelper.insertChatHistory(data);
      if (response.code !== undefined) {
        console.log("Success");
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const captureData = (originalMessage, chat_id, title, response) => {
    setMessages([
      ...originalMessage,
      { chat_id, title, is_bot: false },
      ...response,
    ]);
  };

  const fetchUserInput = async () => {
    try {
      if (textValue === "") {
        Swal.fire({
          icon: "warning",
          text: "Field is Empty!",
          confirmButtonColor: Colors.primaryColor,
          allowOutsideClick: false,
        });
        return;
      }
      const chats = messages.findLast((id) => true);
      setMessages([
        ...messages,
        { chat_id: chats.chat_id, title: textValue, is_bot: false },
      ]);
      setPreText(textValue);

      const filterText = { keywords: textValue, chat_id: nextId };
      let textResponse = await FinbotHelper.getTextResponse(filterText);

      if (textResponse.length === 0) {
        setMessages([
          ...messages,
          { chat_id: chats.chat_id, title: textValue, is_bot: false },
          {
            chat_id: chats.chat_id,
            title:
              "Unfortunately, I can't assist you with that yet, but our customer care representatives would be happy to help",
            is_bot: true,
          },
        ]);
        insertChatHistory(chatbot_id.id, nextId, textValue);
      } else {
        const filter = { chat_id: textResponse[0].next_id };
        let response = await FinbotHelper.get(filter);
        response = response.map((step) => ({
          ...step,
          title: step.title.includes("${{months}}")
            ? step.title.replace("${{months}}", textValue)
            : step.title,
        }));

        setMessages([
          ...messages,
          { chat_id: chats.chat_id, title: textValue, is_bot: false },
          ...response,
        ]);
        const chat_id = response.findLast((id) => true);
        insertChatHistory(textResponse[0].next_id, chat_id.chat_id, textValue);
        setNextId(textResponse[0].next_id);
      }
      setTextValue("");
      scrollToBottom();
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };

  const addMessage = async (options, response_id, next_id, parentMessage) => {
    try {
      setNextId(next_id);
      const filter = { chat_id: next_id };
      let response = await FinbotHelper.get(filter);
      response = response.map((step) => ({
        ...step,
        title: step.title.includes("${{months}}")
          ? step.title.replace("${{months}}", preText)
          : step.title,
      }));

      const updatedMessages = messages.map((message) => ({ ...message }));
      captureData(updatedMessages, response_id, options.options, response);
      insertChatHistory(parentMessage.id, next_id, options.id);
      scrollToBottom();
    } catch (error) {
      console.error("Error adding message:", error);
    }
  };

  return (
    <div>
      <SideMenu tag="finbot">
        <Head title="Finbot" />
        <div className={styles.wrapper}>
          {console.log(messages)}
          <div className={styles.headingWrapper}>
            <div className={styles.chatHeadingAlignment}>
              <div className={styles.chatIconAlignment}>
                <img src="/assets/chatbot.png" />
              </div>
              <p>Finbot</p>
            </div>
            <div className={styles.chatHeadingAlignment}>
              <a onClick={clear}>Clear Chat</a>
            </div>
          </div>
          <div
            ref={containerRef}
            className={`${styles.innerWrapper} ${styles.messagesContainer}`}
          >
            <div className={styles.chatAlignment}>
              <img src="/assets/chatbot-1.png" className={styles.chatIcon} />
              <p>Finbot</p>
            </div>

            {messages.map((m) => (
              <div style={{ marginBottom: 10 }} key={m.chat_id}>
                {m.is_bot ? (
                  <div className={styles.chatbotStyle}>
                    <p>{m.title}</p>
                  </div>
                ) : (
                  <div className={styles.userStyle}>
                    <p>{m.title}</p>
                  </div>
                )}
                {m.options != null &&
                  m.options.map(
                    (o) =>
                      o.is_bot &&
                      o.id != null && (
                        <div key={o.id} style={{ borderRadius: "20px" }}>
                          <div
                            className={styles.options}
                            onClick={() =>
                              addMessage(o, o.response_id, o.next_id, m)
                            }
                          >
                            {o.options}
                          </div>
                        </div>
                      )
                  )}
              </div>
            ))}
          </div>

          <div className={`${styles.searchBar}`}>
            <input
              type="text"
              placeholder=" Type here"
              id="text1"
              className={`${styles.inputSearch}`}
              value={textValue}
              onChange={(e) => {
                setTextValue(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  fetchUserInput();
                }
              }}
            />
            <div
              className={styles.searchButton}
              onClick={(e) => fetchUserInput()}
            >
              <img src="/assets/right-arrow.png" className={styles.arrowIcon} />
            </div>
          </div>
        </div>
      </SideMenu>
    </div>
  );
};

export default PopUp;
