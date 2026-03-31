const marked=require("marked");
const sanitize=require("sanitize-html");
const TurndownService = require("turndown");

function sanitizeMarkdown(markdownContent){

    const turndownService=new TurndownService();//and this turndownservice will have many funcs
    //1. Convert markdown to html 
    const convertToHTML=marked.parse(markdownContent);

    //2. Sanitize the HTML 
    const sanitizedHTML=sanitize(convertToHTML,
        {
            allowedTags:sanitize.defaults.allowedTags
        }
    );

    // return sanitizedHTML;
    /*
    As per the doc first of all we have to creat a branch new object
    and simply pass the sanitized HTMl to get sanitized markdown
    */

    //3. Convert the HTML back to markdown 
    const sanitizedMarkDown=turndownService.turndown(sanitizedHTML);

    return sanitizedMarkDown;
}

module.exports=sanitizeMarkdown;

//we donot need any script tag to comeup

/*
There is another package called as turndown, which tell us about the sanitize HTML to markdown
altoug we can make sure that people are inputting markdown, and you're saving it in form of html 
so while editing the problem the  person needs to know the HTML, and also wriitng HTML is pretty slower so 
yes this turndown package is also very useful 

*/
