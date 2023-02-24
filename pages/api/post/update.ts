import type { NextApiRequest, NextApiResponse } from 'next'
 import { NodeHtmlMarkdown, NodeHtmlMarkdownOptions } from 'node-html-markdown'
import axios from 'axios';
import { prisma } from "@/lib/db";
const turndownService = require('turndown');
const turndown = new turndownService();

turndown.addRule('script', {
  filter: 'script',
  replacement: function() {
    return '';
  }
});


turndown.addRule('table', {
    filter: 'table',
    replacement: function(content) {
      return content;
    }
  });

type Data = {
  name: string
}

const baseUrl = process.env.BASE_URL;
const getPostData = async (page:number) => {
    try {
        const res = await axios({
            method: 'GET',
            url: `${baseUrl}/wp/v2/posts?per_page=20&page=${page}`
        })

        if (res && res.data) {
            return res.data
        }
    } catch (error) {
        console.log(error)
    }
}

const updatePostData = async () => {
    try {
        let updateData:any[] = [];
        for (let index = 1; index < 2; index++) {

            const data = await getPostData(index);
            if (data.length) {
                updateData = [...updateData, ...data];
            } else {
                break;
            }
        }
     
        for (const post of updateData) {
            const { id, date, slug, title, content, excerpt, categories, tags, featured_media } = post;
            const markdown = NodeHtmlMarkdown.translate(content.rendered);
           
           // const markdown = turndown.turndown(content.rendered);
            
            //console.log('markdown', markdown)
            const postObj = {
                postid: String(id),
                date,
                slug,
                content:markdown,
                title: title.rendered,
                excerpt,
                categories,
                tags,
                featured_media,
            };
            console.log('id', title)
            await prisma.post.upsert({
                where: { slug: slug || '' },
                update: postObj,
                create: postObj,
            });
        }
        return `done ${updateData.length}`;
    } catch (error) {
        console.log('error test');
        return error;
    }
};


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  let response =  await updatePostData()
  console.log('baseUrl', response)
  res.status(200).json({ name: 'John Doe' })
}
