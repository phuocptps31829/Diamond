import React from "react";
import { Controller } from "react-hook-form";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Autoformat,
  Bold,
  Italic,
  Underline,
  BlockQuote,
  Base64UploadAdapter,
  CloudServices,
  CKBox,
  Essentials,
  Heading,
  Image,
  ImageCaption,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  PictureEditing,
  Indent,
  IndentBlock,
  Link,
  List,
  MediaEmbed,
  Mention,
  Paragraph,
  PasteFromOffice,
  Table,
  TableColumnResize,
  TableToolbar,
  TextTransformation,
} from "ckeditor5";
import { SlashCommand } from "ckeditor5-premium-features";
import "ckeditor5/ckeditor5.css";
import "ckeditor5-premium-features/ckeditor5-premium-features.css";

const ServiceEditor = ({ control, name, errors }) => {
  const CKBOX_TOKEN_URL = "";
  const LICENSE_KEY = "";
  const error = errors[name];
  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue="<p>Hãy nhập bài viết</p>"
        render={({ field }) => (
          <CKEditor
            editor={ClassicEditor}
            data={field.value}
            onChange={(event, editor) => {
              const data = editor.getData();
              field.onChange(data);
              console.log({ event, editor, data });
            }}
            config={{
              toolbar: [
                "undo",
                "redo",
                "|",
                "heading",
                "|",
                "bold",
                "italic",
                "underline",
                "|",
                "link",
                "uploadImage",
                "ckbox",
                "insertTable",
                "blockQuote",
                "mediaEmbed",
                "|",
                "bulletedList",
                "numberedList",
                "|",
                "outdent",
                "indent",
              ],
              plugins: [
                Autoformat,
                BlockQuote,
                Bold,
                CloudServices,
                ...(CKBOX_TOKEN_URL ? [CKBox] : []),
                Essentials,
                Heading,
                Image,
                ImageCaption,
                ImageResize,
                ImageStyle,
                ImageToolbar,
                ImageUpload,
                Base64UploadAdapter,
                Indent,
                IndentBlock,
                Italic,
                Link,
                List,
                MediaEmbed,
                Mention,
                Paragraph,
                PasteFromOffice,
                PictureEditing,
                Table,
                TableColumnResize,
                TableToolbar,
                TextTransformation,
                Underline,
                ...(LICENSE_KEY ? [SlashCommand] : []),
              ],
              image: {
                resizeOptions: [
                  {
                    name: "resizeImage:original",
                    label: "Default image width",
                    value: null,
                  },
                  {
                    name: "resizeImage:50",
                    label: "50% page width",
                    value: "50",
                  },
                  {
                    name: "resizeImage:75",
                    label: "75% page width",
                    value: "75",
                  },
                ],
                toolbar: [
                  "imageTextAlternative",
                  "toggleImageCaption",
                  "|",
                  "imageStyle:inline",
                  "imageStyle:wrapText",
                  "imageStyle:breakText",
                  "|",
                  "resizeImage",
                ],
              },
              heading: {
                options: [
                  {
                    model: "paragraph",
                    title: "Paragraph",
                    class: "ck-heading_paragraph",
                  },
                  {
                    model: "heading1",
                    view: "h1",
                    title: "Heading 1",
                    class: "ck-heading_heading1",
                  },
                  {
                    model: "heading2",
                    view: "h2",
                    title: "Heading 2",
                    class: "ck-heading_heading2",
                  },
                  {
                    model: "heading3",
                    view: "h3",
                    title: "Heading 3",
                    class: "ck-heading_heading3",
                  },
                  {
                    model: "heading4",
                    view: "h4",
                    title: "Heading 4",
                    class: "ck-heading_heading4",
                  },
                ],
              },
              link: {
                addTargetToExternalLinks: true,
                defaultProtocol: "https://",
              },
              table: {
                contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
              },
              ckbox: {
                tokenUrl: CKBOX_TOKEN_URL,
              },
            }}
          />
        )}
      />
      {error && (
        <small className="mt-1 block text-sm text-red-500">
          {error.message}
        </small>
      )}
    </>
  );
};

export default ServiceEditor;
