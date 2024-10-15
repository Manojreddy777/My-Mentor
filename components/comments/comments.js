import React from "react";
import Swal from "sweetalert2";
import moment from "moment";
import Colors from "../../constants/colors";
import styles from "./comments.module.css";
import CommentsHelper from "../../helper/comments"; 
import { EditorState, convertToRaw, ContentState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import dynamic from "next/dynamic";
const Editor = dynamic(
    () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
    { ssr: false }
);

export default class Comments extends React.Component {
    constructor(props) {
        super(props);
        const stateData = {
            rec_id: undefined,
            com_id: undefined,
            from_user: undefined,
            content: undefined,
            editorState: EditorState.createEmpty(),
            array_comments: [],
            tnnt_id: global.config.tnnt_id,
            is_loading: false, 
        };
        
        if (props.id !== undefined) {
            stateData.rec_id = props.id;
            stateData.com_id = props.com_id;
        }
        this.state = {
            ...stateData,
        };
    }
    componentDidMount() {
        const { content } = this.state;

        if (content != undefined && content != "") {
            const htmlToDraft = require("html-to-draftjs").default;
            const contentBlock = htmlToDraft(content);
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(
                    contentBlock.contentBlocks
                );
                this.setState({
                    tnnt_id: global.config.tnnt_id, 
                    editorState: EditorState.createWithContent(contentState),
                });
            }
        }

        this.getById();
    }

    getById() {
        const {
            tnnt_id,
            com_id,
            rec_id,
        } = this.state;

        const filter = {
            tnnt_id: tnnt_id,
            com_id: com_id,
            com_rec_id: rec_id
        };

       

        CommentsHelper.get(filter)
            .then((data) => {
                
                this.setState({ array_comments: data.comments });
            })
            .catch((err) => {
                console.log(err);
            });
    }
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    sendMessage() {
        const { rec_id, com_id, tnnt_id, editorState } = this.state;

        if (editorState.getCurrentContent().hasText() === false) {
            Swal.fire({
                icon: "warning",
                title: "Fill the fields to continue!",
                html: ". Comments",
                confirmButtonColor: Colors.primaryColor,
                allowOutsideClick: false,
            });
        }

        const data = {
            com_id: com_id,
            com_rec_id: rec_id,
            comments: draftToHtml(convertToRaw(editorState.getCurrentContent())), 
            created_by: global.config.username,
            tnnt_id: tnnt_id,
        };
        this.setState({ is_loading: true });
        CommentsHelper.create(data)
            .then((data) => {
                if (data.code == 200) {
                    this.setState({ is_loading: false });
                    this.getById();
                    this.props.getCount();
                    const editorState = EditorState.push(
                        this.state.editorState,
                        ContentState.createFromText("")
                    );
                    this.setState({ editorState });
                }
            })
            .catch((err) => {
                console.log(err);
            });
         return;
    }



    getContent = (content) => {
        if (content) {
            return {
                __html: content,
            };
        }
    };

    render() {
        const { setVisibility } = this.props;
        const { editorState, array_comments } = this.state;
        const { is_loading } = this.state;
        return (
            <div className={styles.mainWrapper}>
                	{is_loading && (
                    <div className={"loadingWrapper"}>
                        <div className={"innerLoadingWrapper"}>
                            <div class="bouncing-loader">
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                )}
                <div
                    className={styles.wrapper}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={styles.heading}>
                        <img
                            src="/assets/close-black.png"
                            className={styles.closeButton}
                            onClick={() => setVisibility(false)}
                        />
                        <p className={styles.title}>{"Comments"}</p>
                    </div>
                    <div className={styles.middleWrapper}>
                        <div
                            style={{
                                border: "1px solid rgb(201, 201, 201)",
                                backgroundColor: "white",
                            }}
                        >
                            <Editor
                                editorState={editorState}
                                editorStyle={{
                                    paddingLeft: 10,
                                    paddingRight: 20,
                                }}
                                toolbar={{
                                    options: [
                                        "inline",
                                        "fontSize",
                                        "list",
                                        "textAlign",
                                    ],
                                }}
                                onEditorStateChange={this.onEditorStateChange}
                                placeholder="Comments"
                            />
                        </div>
                        <div className={styles.buttonAlignment}>
                            <button
                                className={styles.button}
                                onClick={() => this.sendMessage()}
                            >
                                {"Send"}
                            </button>
                        </div>

                        {array_comments?.map((c) => (
                            <div className={styles.contentAlignment}>
                                <div className={styles.imageAlignment}>
                                    <i
                                        class="fa fa-user-circle-o"
                                        style={{
                                            fontSize: "30px",
                                            color: "#4473db",
                                        }}
                                    ></i>
                                </div>
                                <div>
                                    <div className={styles.singleLine}>
                                        <p className={styles.fromUser}>
                                            {c.created_by}
                                        </p>
                                        <p>&nbsp;{"commented"}</p>
                                    </div>
                                    <div
                                        dangerouslySetInnerHTML={this.getContent(
                                            c.comments
                                        )}
                                    />
                                    <p className={styles.timeFont}>
                                        {moment.utc(c.created_at).format("YYYY-MM-DD HH:mm:ss")}
                                    </p>
                                </div>
                                {/* <div className={styles.deleteAlignment}>
                                    <i
                                        class="fa fa-trash"
                                        aria-hidden="true"
                                        style={{
                                            fontSize: "15px",
                                            color: "#C3C3C3",
                                        }}
                                        onClick={() => this.delete(c.id)}
                                    ></i>
                                </div> */}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

