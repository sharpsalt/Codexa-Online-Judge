const marked=require("marked");
const sanitize=require("sanitize")

function sanitizeMarkdown(markdownContent){
    //1. Convert markdown to html 
    const convertToHTML=marked.parse(markdownContent);

    //2. Sanitize the HTML 
    const sanitizedHTML=sanitize(convertToHTML,
        {
            allowedTags:sanitizedHTML.defaults.allowedTags
        }
    );

    return sanitizedHTML;
}

module.exports=sanitizeMarkdown;

//we donot need any script tag to comeup












