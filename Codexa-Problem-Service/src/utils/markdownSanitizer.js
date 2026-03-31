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

/*
There is another package called as turndown, which tell us about the sanitize HTML to markdown
altoug we can make sure that people are inputting markdown, and you're saving it in form of html 
so while editing the problem the  person needs to know the HTML, and also wriitng HTML is pretty slower so 
yes this turndown package is also very useful 

*/












