'use strict';
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagsarrayLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML), 
  articleAuthorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tagcloud-link').innerHTML),
  authorListLink: Handlebars.compile(document.querySelector('#template-authorlist-link').innerHTML),
};

const titleClickHandler = function(){
  const clickedElement = this;

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('article.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
};

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optArticleAuthorSelector = '.post-author';

const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';
const optAuthorsListSelector = '.authors.list';

const optCloudClassCount = '5';
const optCloudClassPrefix = 'tag-size-';
const optTagsListSelector = '.tags.list';

// eslint-disable-next-line indent
  const generateTitleLinks = function(selector = '') {
  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* [DONE] find all the articles and save them to variable: articles  */
  const articles = document.querySelectorAll(optArticleSelector + selector);

  let html = '';

  for (let article of articles) {
    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');

    /* [DONE] find and get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* [DONE] create HTML of the link */
    //const linkHTML = `<li>
    //                    <a href="#tag-${articleId}"><span>${articleTitle}</span></a>
    //                  </li>`;                  
    const linkHTML = templates.articleLink({id: articleId, title: articleTitle});

    /* [DONE] insert link into titleList */
    html += linkHTML;
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
};

const calculateTagsParams = function(tags) {
  const params = { max: 0, min: 999999 };
  for (let tag in tags) {
    params.max = tags[tag] > params.max ? tags[tag] : params.max;
    params.min = tags[tag] < params.min ? tags[tag] : params.min;
  }
  return params;
};

const calculateTagClass = function(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const classNumber = Math.floor(normalizedCount / normalizedMax * (optCloudClassCount - 1) + 1);
  return optCloudClassPrefix + classNumber;
};

const generateTags = function(){
  let allTags={};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {

      /* generate HTML of the link */
      //const linkHTML = `<li>
      //                    <a href="#tag-${tag}"><span>${tag}</span></a>
      //                  </li>`;
    
      const linkHTML = templates.articleLink({id: `tag-${tag}`, title: tag});

      /* add generated code to html variable */
      html += linkHTML;

      if (allTags[tag]) {
        allTags[tag]++;
      }
      else {
        allTags[tag]=1;
      }

    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;

  /* END LOOP: for every article: */
  }

  //let html = '';
  const tagList = document.querySelector(optTagsListSelector);
  const tagsParams = calculateTagsParams(allTags);

  const htmlTag = {tags: []};

  for (let tag in allTags) {
    //const tagLinkHTML = `<li class="${calculateTagClass(allTags[tag], tagsParams)}">
    //                      <a href="#tag-${tag}">${tag}(${allTags[tag]})</a>
    //                     </li>`;
    htmlTag.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });

    //html += tagLinkHTML;
  }
  //tagList.innerHTML = html;
  tagList.innerHTML = templates.tagCloudLink(htmlTag);
};

const tagClickHandler = function(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (let activeTagLink of activeTagLinks) {

    /* remove class active */
    activeTagLink.classList.remove('active');

  /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const sameTagLinks = document.querySelectorAll(`a[href="${href}"]`);

  /* START LOOP: for each found tag link */
  for (let sameTagLink of sameTagLinks) {

    /* add class active */
    sameTagLink.classList.add('active');

  /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks(`[data-tags~="${tag}"]`);
};

const addClickListenersToTags=function(){
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');

  /* START LOOP: for each link */
  for (let tagLink of tagLinks) {
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
  }
};

const generateAuthors = function() {
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  const authors = {};
  
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find authors wrapper */
    const authorsWrapper = article.querySelector(optArticleAuthorSelector);

    /* get author from data-author attribute */
    const author = article.getAttribute('data-author');

    if (authors[author]) {
      authors[author]++;
    }
    else {
      authors[author]=1;
    }

    //const authorLinkItem = `<li>
    //              <a href="#author-${author}"><span>${author}</span></a>
    //              </li>`;
    const authorLinkItem  = templates.articleAuthorLink({author: author}); 
    
    /* insert HTML of all the links into the authors wrapper */
    authorsWrapper.innerHTML += authorLinkItem;

    /* END LOOP: for every article: */
  }

  const authorList = document.querySelector(optAuthorsListSelector);
  //let html=''; 
  const html = {authors: []};
  
  for (let author in authors) {
    //const authorLinkItem = `<li>
    //             <a href="#author-${author}">${author}(${authors[author]})</a>
    //             </li>`;

    //html += authorLinkItem;
    html.authors.push({
      author: author,
      count: authors[author],
    });
  }

  //authorList.innerHTML = html;
  authorList.innerHTML = templates.authorListLink(html);
};

const addClickListenersToAuthors = function() {
  /* find all links to authors*/
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');

  /* START LOOP: for each link */
  for (let authorLink of authorLinks) {
    /* add authorClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);

    /* END LOOP: for each link */
  }
};

const authorClickHandler = function(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks(`[data-author="${author}"]`);
};

generateTitleLinks();
generateTags();
generateAuthors();
addClickListenersToTags();
addClickListenersToAuthors();
