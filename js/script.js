'use strict';
const titleClickHandler = function(event){
    //console.log('Link was clicked!');
    //console.log(event);
    const clickedElement = this;

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    //console.log("clickedElement:", clickedElement);
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
  }

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

  function generateTitleLinks() {
  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

    /* [DONE] find all the articles and save them to variable: articles  */
  const articles = document.querySelectorAll(optArticleSelector);

  let html = '';

  for (let article of articles) {
    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');

    /* [DONE] find and get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* [DONE] create HTML of the link */
    const linkHTML = `<li>
                        <a href="#${articleId}"><span>${articleTitle}</span></a>
                      </li>`;

    /* [DONE] insert link into titleList */
    html += linkHTML;
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

function generateTags(){
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
      const linkHTML = `<li>
                          <a href="#tag-${tag}"><span>${tag}</span></a>
                        </li>`;

      /* add generated code to html variable */
      html += linkHTML;
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */

    tagsWrapper.innerHTML = html;
  /* END LOOP: for every article: */
  }
}

function tagClickHandler(event){
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
}

function addClickListenersToTags(){
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');

  /* START LOOP: for each link */
  for (let tagLink of tagLinks) {
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
  }
}

function generateAuthors() {
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

    console.log(authors);
    const authorLinkItem = `<li>
                  <a href="#author-${author}"><span>${author}</span></a>
                  </li>`;

    /* insert HTML of all the links into the authors wrapper */
    authorsWrapper.innerHTML += authorLinkItem;

    /* END LOOP: for every article: */
  }

  const authorList = document.querySelector(optAuthorsListSelector);
  let html='';

  for (let author in authors) {
    const authorLinkItem = `<li>
                  <a href="#author-${author}">${author}(${authors[author]})</a>
                  </li>`;
    html += authorLinkItem;
  }

  authorList.innerHTML = html;
}

function addClickListenersToAuthors() {
  /* find all links to authors*/
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');

  /* START LOOP: for each link */
  for (let authorLink of authorLinks) {
    /* add authorClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);

    /* END LOOP: for each link */
  }
}

function authorClickHandler(event) {
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
}


generateTitleLinks();
generateTags();
generateAuthors();
addClickListenersToTags();
addClickListenersToAuthors();

