import React from "react";
import styles from "./documentModal.module.css";

import dynamic from "next/dynamic";
const FileViewer = dynamic(() => import('react-file-viewer'), { ssr: false });

export default class DocumentModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file_name: this.props.file_name,
            file_document_view: this.props.data,
            file_type: "",
            bl_new_file: false,
        };
    }

    componentDidMount() {
        if (typeof (this.props.file_name) === 'string') {
            const type = this.getFileExtension(this.props.file_name);
            this.setState({ file_type: type })
        } else {
            this.setState({ bl_new_file: true })
        }
    }

    getFileExtension = (filename) => {
        if (!filename) {
            return null;
        }

        const dotIndex = filename.lastIndexOf('.');
        if (dotIndex === -1) {
            return null;
        }

        return filename.slice(dotIndex + 1);
    };

    render() {
        const {
            file_type,
            file_document_view,
            bl_new_file
        } = this.state;

        return (
            <div className={styles.mainWrapper}>
                <div
                    className={styles.wrapper}
                    onClick={(e) => e.stopPropagation()}
                >
                    <img
                        src="/assets/close-red.png"
                        alt="Close Icon"
                        className={styles.closeButton}
                        onClick={() => this.props.setVisibility(false)}
                    />

                    <p className={styles.title}>{"Document"}</p>
                                        {this.props.data == undefined ?
                        <div>
                            <img src="\assets\nopreview.png" />
                        </div> :

                    <div className={styles.documentView}>
                        {bl_new_file ?
                            this.state['file_name'] !== undefined &&
                            <embed
                                src={typeof this.state['file_name'] == "string"
                                    ? this.state['file_name']
                                    : URL.createObjectURL(this.state['file_name'])}
                                width="100%"
                                height="600"
                            /> :
                            <FileViewer
                                fileType={file_type}
                                filePath={`data:${file_type};base64,${file_document_view}`}
                                onError={(e) => console.log('Error:', e)}
                            />
                        }
                    </div>
                   }
                </div>
            </div>
        )
    }
}
