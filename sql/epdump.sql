--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: MaritasBlog; Type: TABLE; Schema: public; Owner: epadmin; Tablespace: 
--

CREATE TABLE "MaritasBlog" (
    blog_id integer NOT NULL,
    author text,
    blog xml
);


ALTER TABLE public."MaritasBlog" OWNER TO epadmin;

--
-- Name: MaritasBlog_blog_id_seq; Type: SEQUENCE; Schema: public; Owner: epadmin
--

CREATE SEQUENCE "MaritasBlog_blog_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."MaritasBlog_blog_id_seq" OWNER TO epadmin;

--
-- Name: MaritasBlog_blog_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: epadmin
--

ALTER SEQUENCE "MaritasBlog_blog_id_seq" OWNED BY "MaritasBlog".blog_id;


--
-- Name: account; Type: TABLE; Schema: public; Owner: epadmin; Tablespace: 
--

CREATE TABLE account (
    userid integer NOT NULL,
    firstname text,
    lastname text,
    email text,
    password text,
    username text,
    alias text,
    credentials text
);


ALTER TABLE public.account OWNER TO epadmin;

--
-- Name: account_userid_seq; Type: SEQUENCE; Schema: public; Owner: epadmin
--

CREATE SEQUENCE account_userid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.account_userid_seq OWNER TO epadmin;

--
-- Name: account_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: epadmin
--

ALTER SEQUENCE account_userid_seq OWNED BY account.userid;


--
-- Name: body; Type: TABLE; Schema: public; Owner: epadmin; Tablespace: 
--

CREATE TABLE body (
    rev_id integer NOT NULL,
    rev_date timestamp without time zone,
    content text
);


ALTER TABLE public.body OWNER TO epadmin;

--
-- Name: elements; Type: TABLE; Schema: public; Owner: epadmin; Tablespace: 
--

CREATE TABLE elements (
    id integer NOT NULL,
    name text NOT NULL,
    content xml
);


ALTER TABLE public.elements OWNER TO epadmin;

--
-- Name: elements_id_seq; Type: SEQUENCE; Schema: public; Owner: epadmin
--

CREATE SEQUENCE elements_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.elements_id_seq OWNER TO epadmin;

--
-- Name: elements_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: epadmin
--

ALTER SEQUENCE elements_id_seq OWNED BY elements.id;


--
-- Name: info; Type: TABLE; Schema: public; Owner: epadmin; Tablespace: 
--

CREATE TABLE info (
    site_id integer,
    rev_date timestamp without time zone,
    title text,
    theme integer
);


ALTER TABLE public.info OWNER TO epadmin;

--
-- Name: scripts; Type: TABLE; Schema: public; Owner: epadmin; Tablespace: 
--

CREATE TABLE scripts (
    name text NOT NULL,
    content text
);


ALTER TABLE public.scripts OWNER TO epadmin;

--
-- Name: style; Type: TABLE; Schema: public; Owner: epadmin; Tablespace: 
--

CREATE TABLE style (
    style_id integer NOT NULL,
    rev_date timestamp without time zone,
    rules xml
);


ALTER TABLE public.style OWNER TO epadmin;

--
-- Name: styles_style_id_seq; Type: SEQUENCE; Schema: public; Owner: epadmin
--

CREATE SEQUENCE styles_style_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.styles_style_id_seq OWNER TO epadmin;

--
-- Name: styles_style_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: epadmin
--

ALTER SEQUENCE styles_style_id_seq OWNED BY style.style_id;


--
-- Name: test_rev_id_seq; Type: SEQUENCE; Schema: public; Owner: epadmin
--

CREATE SEQUENCE test_rev_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.test_rev_id_seq OWNER TO epadmin;

--
-- Name: test_rev_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: epadmin
--

ALTER SEQUENCE test_rev_id_seq OWNED BY body.rev_id;


--
-- Name: theme; Type: TABLE; Schema: public; Owner: epadmin; Tablespace: 
--

CREATE TABLE theme (
    theme_id integer NOT NULL,
    name text,
    theme_url text
);


ALTER TABLE public.theme OWNER TO epadmin;

--
-- Name: theme_theme_id_seq; Type: SEQUENCE; Schema: public; Owner: epadmin
--

CREATE SEQUENCE theme_theme_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.theme_theme_id_seq OWNER TO epadmin;

--
-- Name: theme_theme_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: epadmin
--

ALTER SEQUENCE theme_theme_id_seq OWNED BY theme.theme_id;


--
-- Name: blog_id; Type: DEFAULT; Schema: public; Owner: epadmin
--

ALTER TABLE ONLY "MaritasBlog" ALTER COLUMN blog_id SET DEFAULT nextval('"MaritasBlog_blog_id_seq"'::regclass);


--
-- Name: userid; Type: DEFAULT; Schema: public; Owner: epadmin
--

ALTER TABLE ONLY account ALTER COLUMN userid SET DEFAULT nextval('account_userid_seq'::regclass);


--
-- Name: rev_id; Type: DEFAULT; Schema: public; Owner: epadmin
--

ALTER TABLE ONLY body ALTER COLUMN rev_id SET DEFAULT nextval('test_rev_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: epadmin
--

ALTER TABLE ONLY elements ALTER COLUMN id SET DEFAULT nextval('elements_id_seq'::regclass);


--
-- Name: style_id; Type: DEFAULT; Schema: public; Owner: epadmin
--

ALTER TABLE ONLY style ALTER COLUMN style_id SET DEFAULT nextval('styles_style_id_seq'::regclass);


--
-- Name: theme_id; Type: DEFAULT; Schema: public; Owner: epadmin
--

ALTER TABLE ONLY theme ALTER COLUMN theme_id SET DEFAULT nextval('theme_theme_id_seq'::regclass);


--
-- Data for Name: MaritasBlog; Type: TABLE DATA; Schema: public; Owner: epadmin
--

COPY "MaritasBlog" (blog_id, author, blog) FROM stdin;
\.


--
-- Name: MaritasBlog_blog_id_seq; Type: SEQUENCE SET; Schema: public; Owner: epadmin
--

SELECT pg_catalog.setval('"MaritasBlog_blog_id_seq"', 9, true);


--
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: epadmin
--

COPY account (userid, firstname, lastname, email, password, username, alias, credentials) FROM stdin;
1	\N	\N	\N	admin	admin	\N	admin
2	Marita	Ulvskog	\N	hello	marre	\N	blog
3	Kurt	Olsson	\N	hello	curre	\N	design
\.


--
-- Name: account_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: epadmin
--

SELECT pg_catalog.setval('account_userid_seq', 3, true);


--
-- Data for Name: body; Type: TABLE DATA; Schema: public; Owner: epadmin
--

COPY body (rev_id, rev_date, content) FROM stdin;
1	2014-08-18 09:06:27.17	<div class="navbar navbar-default navbar-fixed-top"><div class="navbar-header"><button type="button" data-target="#navbarCollapse-1" data-toggle="collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button></div><a href="#" class="navbar-brand">Queen</a></div><div id="navbarCollapse-1" class="collapse navbar-collapse"><ul class="nav navbar-nav"><li><a href="">Home</a></li></ul></div><div id="container-1" class="container"><div id="row-1" class="row"><article id="article1" style="" contenteditable="true">Trying with this article</article></div></div>
2	2014-08-18 09:23:10.714	<div class="navbar navbar-default navbar-fixed-top"><div class="navbar-header" style=""><button type="button" data-target="#navbarCollapse-1" data-toggle="collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button></div></div><a href="#" class="navbar-brand" style="">Queen</a><div id="navbarCollapse-1" class="collapse navbar-collapse" style=""><ul class="nav navbar-nav" style=""><li><a href="">Home</a></li></ul></div><div id="container-1" class="container" style=""><div id="row-1" class="row"><article id="article1" style="">Trying with this article</article><article id="article1" contenteditable="true" style="outline: green solid thin;">Second article</article></div></div>
3	2014-08-18 09:24:36.317	<div class="navbar navbar-default navbar-fixed-top"><div class="navbar-header" style=""><button type="button" data-target="#navbarCollapse-1" data-toggle="collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button></div></div><a href="#" class="navbar-brand" style="">Queen</a><div id="navbarCollapse-1" class="collapse navbar-collapse" style=""><ul class="nav navbar-nav" style=""><li><a href="">Home</a></li></ul></div><div id="container-1" class="container" style=""><div id="row-1" class="row"><article id="article1" style="">Trying with this article</article><article id="article1" contenteditable="true" style="outline: green solid thin;">Second article</article></div></div>
4	2014-08-18 09:25:02.27	<div class="navbar navbar-default navbar-fixed-top"><div class="navbar-header"><button type="button" data-target="#navbarCollapse-1" data-toggle="collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button></div></div><a href="#" class="navbar-brand">Queen</a><div id="navbarCollapse-1" class="collapse navbar-collapse"><ul class="nav navbar-nav"><li><a href="">Home</a></li></ul></div><div id="container-1" class="container"><div id="row-1" class="row"><article id="article1" style="" contenteditable="true">Trying with this article</article></div></div>
5	2014-08-18 09:27:02.301	<div class="navbar navbar-default navbar-fixed-top"><div class="navbar-header"><button type="button" data-target="#navbarCollapse-1" data-toggle="collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button></div></div><a href="#" class="navbar-brand">Queen</a><div id="navbarCollapse-1" class="collapse navbar-collapse"><ul class="nav navbar-nav"><li><a href="">Home</a></li></ul></div><div id="container-1" class="container"><div id="row-1" class="row"><article id="article1" style="" contenteditable="true">Trying with this article</article></div></div>
6	2014-08-18 09:29:02.386	<div class="navbar navbar-default navbar-fixed-top"><div class="navbar-header"><button type="button" data-target="#navbarCollapse-1" data-toggle="collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button></div></div><a href="#" class="navbar-brand">Queen</a><div id="navbarCollapse-1" class="collapse navbar-collapse"><ul class="nav navbar-nav"><li><a href="">Home</a></li></ul></div><div id="container-1" class="container"><div id="row-1" class="row"><article id="article1" style="" contenteditable="true">Trying with this article</article></div></div>
7	2014-08-18 09:31:02.652	<div class="navbar navbar-default navbar-fixed-top"><div class="navbar-header"><button type="button" data-target="#navbarCollapse-1" data-toggle="collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button></div></div><a href="#" class="navbar-brand">Queen</a><div id="navbarCollapse-1" class="collapse navbar-collapse"><ul class="nav navbar-nav"><li><a href="">Home</a></li></ul></div><div id="container-1" class="container"><div id="row-1" class="row"><article id="article1" style="" contenteditable="true">Trying with this article</article></div></div>
8	2014-08-18 13:02:22.592	<div class="navbar navbar-default navbar-fixed-top"><div class="navbar-header"><button type="button" data-target="#navbarCollapse-1" data-toggle="collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button></div><a href="#" class="navbar-brand">Queen</a></div><div id="navbarCollapse-1" class="collapse navbar-collapse"><ul class="nav navbar-nav"><li><a href="">Home</a></li></ul></div><div id="container-1" class="container"><div id="row-1" class="row"><article id="article1" style="" contenteditable="true">Trying with this article</article></div></div>
9	2014-08-18 13:03:34.695	<div class="navbar navbar-default navbar-fixed-top"><div class="navbar-header"><button type="button" data-target="#navbarCollapse-1" data-toggle="collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button></div><a href="#" class="navbar-brand">Queen</a></div><div id="navbarCollapse-1" class="collapse navbar-collapse" style=""><ul class="nav navbar-nav"><li><a href="">Home</a></li></ul></div><div id="container-1" class="container" style=""><div id="row-1" class="row" style=""><article id="article1" style="outline: green solid thin;" contenteditable="true">Trying with this article</article></div></div>
10	2014-08-18 13:04:43.712	<div class="navbar navbar-default navbar-fixed-top"><div class="navbar-header"><button type="button" data-target="#navbarCollapse-1" data-toggle="collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button></div><a href="#" class="navbar-brand">Queen</a></div><div id="navbarCollapse-1" class="collapse navbar-collapse" style=""><ul class="nav navbar-nav"><li><a href="">Home</a></li></ul></div><div id="container-1" class="container" style=""><div id="row-1" class="row" style=""><article id="article1" style="outline: green solid thin;" contenteditable="true">Trying with this article</article></div></div>
11	2014-08-18 13:43:08.935	<div class="navbar navbar-default navbar-fixed-top"><div class="navbar-header"><button type="button" data-target="#navbarCollapse-1" data-toggle="collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a href="#/admin" class="navbar-brand">Queen</a></div><div id="navbarCollapse-1" class="collapse navbar-collapse"><ul class="nav navbar-nav"><li><a href="#/admin">Home</a></li></ul></div></div><div id="container-1" class="container" style="outline: green solid thin;"><div id="row-1" class="row" style=""><article id="article1">Trying with this article</article></div></div>
12	2014-08-18 14:28:42.178	<div class="navbar navbar-default navbar-fixed-top" style=""><div class="navbar-header"><button type="button" data-target="#navbarCollapse-1" data-toggle="collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a href="#/admin" class="navbar-brand">Queen</a></div><div id="navbarCollapse-1" class="collapse navbar-collapse"><ul class="nav navbar-nav"><li><a href="#/admin">Home</a></li></ul></div></div><div id="container-1" class="container"><div id="row-1" class="row"><article id="article1">Trying with this article</article><div class="blog-module ng-scope" blog-url="/blog/" name="MaritasBlog" authors="Marita" social="true" date-format="undefined" show-title="true" ng-controller="BlogController" style=""><div ng-repeat="blog in blogs" ng-controller="BlogController" ng-bind="blog"></div></div></div></div>
13	2014-08-18 14:40:00.282	<div class="navbar navbar-default navbar-fixed-top" style=""><div class="navbar-header"><button type="button" data-target="#navbarCollapse-1" data-toggle="collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a href="#/admin" class="navbar-brand">Queen</a></div><div id="navbarCollapse-1" class="collapse navbar-collapse" style=""><ul class="nav navbar-nav"><li><a href="#/admin">Home</a></li></ul></div></div><div id="container-1" class="container"><div id="row-1" class="row"><article id="article1">Trying with this article</article><div class="blog-module ng-scope" blog-url="/blog/" name="MaritasBlog" authors="Marita" social="true" date-format="undefined" show-title="true" ng-controller="BlogController" style=""><div ng-repeat="blog in blogs" ng-bind="blog"></div></div></div></div>
14	2014-08-18 17:26:17.403	<div class="navbar navbar-default navbar-fixed-top" style=""><div class="navbar-header"><button type="button" data-target="#navbarCollapse-1" data-toggle="collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a href="#/admin" class="navbar-brand">Queen</a></div><div id="navbarCollapse-1" class="collapse navbar-collapse" style=""><ul class="nav navbar-nav"><li><a href="#/admin">Home</a></li></ul></div></div><div id="container-1" class="container"><div id="row-1" class="row"></div></div>
15	2014-08-18 17:48:01.52	<div class="navbar navbar-default navbar-fixed-top" style=""><div class="navbar-header"><button type="button" data-target="#navbarCollapse-1" data-toggle="collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a href="#/admin" class="navbar-brand">Queen</a></div><div id="navbarCollapse-1" class="collapse navbar-collapse" style=""><ul class="nav navbar-nav"><li><a href="#/admin">Home</a></li></ul></div></div><div id="container-1" class="container"><div id="row-1" class="row"></div></div>
16	2014-08-18 17:49:23.679	<div class="navbar navbar-default navbar-fixed-top" style=""><div class="navbar-header"><button type="button" data-target="#navbarCollapse-1" data-toggle="collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a href="#/admin" class="navbar-brand">Queen</a></div><div id="navbarCollapse-1" class="collapse navbar-collapse" style=""><ul class="nav navbar-nav"><li><a href="#/admin">Home</a></li></ul></div></div><div id="container-1" class="container"><div id="row-1" class="row"></div></div><article id="article1"></article>
17	2014-08-18 17:50:24.641	<div class="navbar navbar-default navbar-fixed-top" style=""><div class="navbar-header"><button type="button" data-target="#navbarCollapse-1" data-toggle="collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a href="#/admin" class="navbar-brand">Queen</a></div><div id="navbarCollapse-1" class="collapse navbar-collapse" style=""><ul class="nav navbar-nav"><li><a href="#/admin">Home</a></li></ul></div></div><div id="container-1" class="container"><div id="row-1" class="row"></div></div><article id="article1"></article>
18	2014-08-18 18:35:05.707	<div class="navbar navbar-default navbar-fixed-top" style=""><div class="navbar-header"><button type="button" data-target="#navbarCollapse-1" data-toggle="collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a href="#/admin" class="navbar-brand">Queen</a></div><div id="navbarCollapse-1" class="collapse navbar-collapse" style=""><ul class="nav navbar-nav"><li><a href="#/admin">Home</a></li></ul></div></div><div id="container-1" class="container"><div id="row-1" class="row"></div></div><article id="article1"></article>
19	2014-08-18 18:39:56.633	<div class="navbar navbar-default navbar-fixed-top" style=""><div class="navbar-header"><button type="button" data-target="#navbarCollapse-1" data-toggle="collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a href="#/admin" class="navbar-brand">Queen</a></div><div id="navbarCollapse-1" class="collapse navbar-collapse" style=""><ul class="nav navbar-nav"><li><a href="#/admin" style="">Home</a></li></ul></div></div><div id="container-1" class="container"><div id="row-1" class="row"></div></div><article id="article1"></article>
20	2014-08-18 18:41:44.912	<div class="navbar navbar-default navbar-fixed-top" style=""><div class="navbar-header"><button type="button" data-target="#navbarCollapse-1" data-toggle="collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a href="#/admin" class="navbar-brand">Queen</a></div><div id="navbarCollapse-1" class="collapse navbar-collapse"><ul class="nav navbar-nav"><li><a href="#/admin">Home</a></li></ul></div></div><div id="container-1" class="container"><div id="row-1" class="row"></div></div>
21	2014-08-18 18:43:24.116	<div class="navbar navbar-default navbar-fixed-top" style=""><div class="navbar-header"><button type="button" data-target="#navbarCollapse-1" data-toggle="collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a href="#/admin" class="navbar-brand">Queen</a></div><div id="navbarCollapse-1" class="collapse navbar-collapse" style=""><ul class="nav navbar-nav"><li><a href="#/admin">Home</a></li></ul></div></div><div id="container-1" class="container" style=""><div id="row-1" class="row" style=""><div class="blog-module ng-scope" blog-url="/blog/" name="MaritasBlog" authors="Marita" social="true" date-format="undefined" show-title="true" ng-controller="BlogController"><p>Blogs: {{blogs}}</p><div ng-repeat="blog in blogs">{{blog.blog}}</div></div></div></div>
22	2014-08-18 18:44:33.895	<div class="navbar navbar-default navbar-fixed-top" style=""><div class="navbar-header"><button type="button" data-target="#navbarCollapse-1" data-toggle="collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a href="#/admin" class="navbar-brand">Queen</a></div><div id="navbarCollapse-1" class="collapse navbar-collapse" style=""><ul class="nav navbar-nav"><li><a href="#/admin">Home</a></li></ul></div></div><div id="container-1" class="container"><div id="row-1" class="row"></div></div>
23	2014-08-18 18:45:48.7	<div class="navbar navbar-default navbar-fixed-top" style=""><div class="navbar-header"><button type="button" data-target="#navbarCollapse-1" data-toggle="collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a href="#/admin" class="navbar-brand">Queen</a></div><div id="navbarCollapse-1" class="collapse navbar-collapse" style=""><ul class="nav navbar-nav"><li><a href="#/admin">Home</a></li></ul></div></div><div id="container-1" class="container" style=""><div id="row-1" class="row"><div class="blog-module ng-scope" blog-url="/blog/" name="MaritasBlog" authors="Marita" social="true" date-format="undefined" show-title="true" ng-controller="BlogController" style="outline: green solid thin;"><p>Blogs: {{blogs}}</p><div ng-repeat="blog in blogs">{{blog.blog}}</div></div></div></div>
24	2014-08-18 18:56:52.034	<div class="navbar navbar-default navbar-fixed-top" style=""><div class="navbar-header"><button type="button" data-target="#navbarCollapse-1" data-toggle="collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a href="#/admin" class="navbar-brand">Queen</a></div><div id="navbarCollapse-1" class="collapse navbar-collapse"><ul class="nav navbar-nav"><li><a href="#/admin">Home</a></li></ul></div></div><div id="container-1" class="container" style=""><div id="row-1" class="row"><div class="blog-module ng-scope" blog-url="/blog/" name="MaritasBlog" authors="Marita" social="true" date-format="undefined" show-title="true" ng-controller="BlogController" style="outline: green solid thin;"><p>Blogs: {{blogs}}</p><div ng-repeat="blog in blogs">{{blog.blog}}</div></div></div></div>
25	2014-08-18 18:57:35.923	<div class="navbar navbar-default navbar-fixed-top" style=""><div class="navbar-header"><button type="button" data-target="#navbarCollapse-1" data-toggle="collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a href="#/admin" class="navbar-brand">Queen</a></div><div id="navbarCollapse-1" class="collapse navbar-collapse"><ul class="nav navbar-nav"><li><a href="#/admin">Home</a></li></ul></div></div><div id="container-1" class="container" style=""><div id="row-1" class="row"><div class="blog-module ng-scope" blog-url="/blog/" name="MaritasBlog" authors="Marita" social="true" date-format="undefined" show-title="true" ng-controller="BlogController" style="outline: green solid thin;"><p>Blogs: {{blogs}}</p><div ng-repeat="blog in blogs">{{blog.blog}}</div></div></div></div>
26	2014-08-18 18:58:51.978	<div class="navbar navbar-default navbar-fixed-top" style=""><div class="navbar-header"><button type="button" data-target="#navbarCollapse-1" data-toggle="collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a href="#/admin" class="navbar-brand">Queen</a></div><div id="navbarCollapse-1" class="collapse navbar-collapse"><ul class="nav navbar-nav"><li><a href="#/admin">Home</a></li></ul></div></div><div id="container-1" class="container" style=""><div id="row-1" class="row"><div class="blog-module ng-scope" blog-url="/blog/" name="MaritasBlog" authors="Marita" social="true" date-format="undefined" show-title="true" ng-controller="BlogController" style="outline: green solid thin;"><p>Blogs: {{blogs}}</p><div ng-repeat="blog in blogs">{{blog.blog}}</div></div></div></div>
27	2014-08-18 18:59:18.831	<div class="navbar navbar-default navbar-fixed-top" style=""><div class="navbar-header"><button type="button" data-target="#navbarCollapse-1" data-toggle="collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a href="#/admin" class="navbar-brand">Queen</a></div><div id="navbarCollapse-1" class="collapse navbar-collapse"><ul class="nav navbar-nav"><li><a href="#/admin">Home</a></li></ul></div></div><div id="container-1" class="container" style=""><div id="row-1" class="row" style=""><div class="blog-module ng-scope" blog-url="/blog/" name="MaritasBlog" authors="Marita" social="true" date-format="undefined" show-title="true" ng-controller="BlogController" style="outline: green solid thin;"><p>Blogs: {{blogs}}</p><div ng-repeat="blog in blogs">{{blog.blog}}</div></div></div></div>
28	2014-08-18 23:27:05.457	<div class="navbar navbar-default navbar-fixed-top" style=""><div class="navbar-header"><button type="button" data-target="#navbarCollapse-1" data-toggle="collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a href="#/admin" class="navbar-brand">Queen</a></div><div id="navbarCollapse-1" class="collapse navbar-collapse" style=""><ul class="nav navbar-nav"><li><a href="#/admin">Home</a></li></ul></div></div><div id="container-1" class="container" style=""><div id="row-1" class="row" style="outline: green solid thin;"></div></div>
29	2014-08-19 17:47:53.75	<div class="navbar navbar-default navbar-fixed-top" style=""><div class="navbar-header"><button type="button" data-target="#navbarCollapse-1" data-toggle="collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a href="#/admin" class="navbar-brand" style="">Queen</a></div><div id="navbarCollapse-1" class="collapse navbar-collapse" style=""><ul class="nav navbar-nav"><li><a href="#/admin" style="">Home</a></li></ul></div></div><div id="container-1" class="container" style=""><div id="row-1" class="row" style=""><h1 style="">The most amazing CMS you ever saw!!!</h1><p style="outline: green solid thin;" contenteditable="true"><br></p></div></div>
30	2014-08-20 01:00:07.41	<div class="navbar navbar-default navbar-fixed-top"><div class="navbar-header"><button type="button" data-target="#navbarCollapse-1" data-toggle="collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a href="#/admin" class="navbar-brand">Queen</a></div><div id="navbarCollapse-1" class="collapse navbar-collapse" style="outline: -webkit-focus-ring-color solid 2px;"><ul class="nav navbar-nav"><li><a href="#/admin" style="">Home</a></li></ul></div></div><div id="container-1" class="container"><div id="row-1" class="row"><h1 spellcheck="false">The most amazing CMS you ever saw!!!</h1><p><br></p><p spellcheck="false"><div><i>What a treat!!</i></div><div><i><b>Don't complain</b></i></div><div><i><b>I just have to have something to edit and work with</b></i></div><div><i><b><br></b></i></div></p></div></div>
31	2014-08-20 01:30:52.515	<div class="navbar navbar-default navbar-fixed-top"><div class="navbar-header"><button type="button" data-target="#navbarCollapse-1" data-toggle="collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a href="#/admin" class="navbar-brand">Queen</a></div><div id="navbarCollapse-1" class="collapse navbar-collapse"><ul class="nav navbar-nav"><li><a href="#/admin" style="">Home</a></li></ul></div></div><div id="container-1" class="container"><div id="row-1" class="row" style="outline: -webkit-focus-ring-color solid 2px;"><h1 spellcheck="false">The most amazing CMS you ever saw!!!</h1><p><br></p><p spellcheck="false"></p><div><i>What a treat!!</i></div><div><i><b>Don't complain</b></i></div><div><i><b>I just have to have something to edit and work with</b></i></div><div style=""><i><b><br></b></i></div><p></p></div></div>
32	2014-08-22 04:02:34.088	<div class="navbar navbar-default navbar-fixed-top"><div class="navbar-header"><button type="button" data-target="#navbarCollapse-1" data-toggle="collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a href="#/admin" class="navbar-brand">Queen</a></div><div id="navbarCollapse-1" class="collapse navbar-collapse"><ul class="nav navbar-nav"><li><a href="#/admin" style="">Home</a></li></ul></div></div><div id="container-1" class="container"><div id="row-1" class="row"><h1 spellcheck="false">The most amazing CMS you ever saw!!!</h1><p><br></p><p spellcheck="false"></p><div><i>What a treat!!</i></div><div><i><b>Don't complain</b></i></div><div><i><b>I just have to have something to edit and work with</b></i></div><div style=""><i><b><br></b></i></div><p></p></div></div>
33	2014-08-30 15:34:45.224	<div class="navbar navbar-default navbar-fixed-top"><div class="navbar-header"><button type="button" data-target="#navbarCollapse-1" data-toggle="collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a href="#/admin" class="navbar-brand">Queen</a></div><div id="navbarCollapse-1" class="collapse navbar-collapse"><ul class="nav navbar-nav"><li><a href="#/admin" style="">Home</a></li></ul></div></div><div id="container-1" class="container"><div id="row-1" class="row" style=""><h1 spellcheck="false" class="" style="outline: -webkit-focus-ring-color solid 2px; box-shadow: rgb(0, 255, 255) 0px 0px 4px;">The most amazing CMS you ever saw!!!</h1></div></div>
34	2014-08-30 15:35:20.941	<div class="navbar navbar-default navbar-fixed-top" style=""><div class="navbar-header"><button type="button" data-target="#navbarCollapse-1" data-toggle="collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a href="#/admin" class="navbar-brand">Queen</a></div><div id="navbarCollapse-1" class="collapse navbar-collapse"><ul class="nav navbar-nav"><li><a href="#/admin" style="">Home</a></li></ul></div></div><div id="container-1" class="container"><div id="row-1" class="row" style=""><h1 spellcheck="false" style="outline: -webkit-focus-ring-color solid 2px; box-shadow: rgb(0, 255, 255) 0px 0px 4px;">The most amazing CMS you ever saw!!!</h1></div></div>
35	2014-08-30 17:14:14.694	<div class="navbar navbar-default navbar-fixed-top" style=""><div class="navbar-header"><button type="button" data-target="#navbarCollapse-1" data-toggle="collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a href="#/admin" class="navbar-brand">Queen</a></div><div id="navbarCollapse-1" class="collapse navbar-collapse"><ul class="nav navbar-nav"><li><a href="#/admin" style="">Home</a></li></ul></div></div><div id="container-1" class="container"><div id="row-1" class="row" style=""><h1 spellcheck="false" class=""><b>amazing</b></h1></div></div>
36	2014-08-30 17:14:52.069	<div class="navbar navbar-default navbar-fixed-top" style=""><div class="navbar-header"><button type="button" data-target="#navbarCollapse-1" data-toggle="collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a href="#/admin" class="navbar-brand">Queen</a></div><div id="navbarCollapse-1" class="collapse navbar-collapse"><ul class="nav navbar-nav"><li><a href="#/admin">Home</a></li></ul></div></div><div id="container-1" class="container"><div id="row-1" class="row"><h1 spellcheck="false" class=""><b>amazing</b></h1></div></div>
37	2014-08-30 17:23:39.88	<div class="navbar navbar-default navbar-fixed-top" style=""><div class="navbar-header"><button type="button" data-target="#navbarCollapse-1" data-toggle="collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a href="#/admin" class="navbar-brand">Queen</a></div><div id="navbarCollapse-1" class="collapse navbar-collapse"><ul class="nav navbar-nav"><li><a href="#/admin">Home</a></li></ul></div></div><div id="container-1" class="container"><div id="row-1" class="row"><h1 spellcheck="false" class="" style=""><b>amazing</b></h1></div></div>
38	2014-09-20 17:02:55.85	<div class="navbar navbar-default navbar-fixed-top"><div class="navbar-header"><button type="button" data-target="#navbarCollapse-1" data-toggle="collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a href="#/admin" class="navbar-brand">Queen</a></div><div id="navbarCollapse-1" class="collapse navbar-collapse"><ul class="nav navbar-nav"><li><a href="#/admin">Home</a></li></ul></div></div><div id="container-1" class="container"><div id="row-1" class="row"><h1><b>amazing</b></h1></div></div>
39	2014-09-25 22:27:56.911	<div class="navbar navbar-default navbar-fixed-top"><div class="navbar-header"><button type="button" data-target="#navbarCollapse-1" data-toggle="collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a href="#/admin" class="navbar-brand">Queen</a></div><div id="navbarCollapse-1" class="collapse navbar-collapse"><ul class="nav navbar-nav"><li><a href="#/admin">Home</a></li></ul></div></div><div id="container-1" class="container"><div id="row-1" class="row"><h1><b>amazing</b></h1></div></div>
40	2014-09-25 22:28:20.765	<div class="navbar navbar-default navbar-fixed-top"><div class="navbar-header"><button type="button" data-target="#navbarCollapse-1" data-toggle="collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a href="#/admin" class="navbar-brand">Queen</a></div><div id="navbarCollapse-1" class="collapse navbar-collapse"><ul class="nav navbar-nav"><li><a href="#/admin">Home</a></li></ul></div></div><div id="container-1" class="container"><div id="row-1" class="row"><h1><b>amazing</b></h1></div></div>
41	2014-09-25 22:28:46.184	<div class="navbar navbar-default navbar-fixed-top"><div class="navbar-header"><button type="button" data-target="#navbarCollapse-1" data-toggle="collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a href="#/admin" class="navbar-brand">Queen</a></div><div id="navbarCollapse-1" class="collapse navbar-collapse"><ul class="nav navbar-nav"><li><a href="#/admin">Home</a></li></ul></div></div><div id="container-1" class="container"><div id="row-1" class="row"><h1><b>amazing</b></h1></div></div>
42	2014-09-25 22:30:21.106	<div class="navbar navbar-default navbar-fixed-top"><div class="navbar-header"><button type="button" data-target="#navbarCollapse-1" data-toggle="collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a href="#/admin" class="navbar-brand">Queen</a></div><div id="navbarCollapse-1" class="collapse navbar-collapse"><ul class="nav navbar-nav"><li><a href="#/admin">Home</a></li></ul></div></div><div id="container-1" class="container"><div id="row-1" class="row"><h1><b>amazing</b></h1></div></div>
43	2014-09-25 22:30:46.495	<div class="navbar navbar-default navbar-fixed-top"><div class="navbar-header"><button type="button" data-target="#navbarCollapse-1" data-toggle="collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a href="#/admin" class="navbar-brand">Queen</a></div><div id="navbarCollapse-1" class="collapse navbar-collapse"><ul class="nav navbar-nav"><li><a href="#/admin">Home</a></li></ul></div></div><div id="container-1" class="container"><div id="row-1" class="row"><h1><b>amazing</b></h1></div></div>
44	2014-09-25 22:58:03.698	<div class="navbar navbar-default navbar-fixed-top"><div class="navbar-header"><button type="button" data-target="#navbarCollapse-1" data-toggle="collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a href="#/admin" class="navbar-brand">Queen</a></div><div id="navbarCollapse-1" class="collapse navbar-collapse"><ul class="nav navbar-nav"><li><a href="#/admin">Home</a></li></ul></div></div><div id="container-1" class="container"><div id="row-1" class="row"><h1><b>amazing</b></h1></div></div>
45	2014-09-25 22:59:09.08	<div class="navbar navbar-default navbar-fixed-top"><div class="navbar-header"><button type="button" data-target="#navbarCollapse-1" data-toggle="collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a href="#/admin" class="navbar-brand">Queen</a></div><div id="navbarCollapse-1" class="collapse navbar-collapse"><ul class="nav navbar-nav"><li><a href="#/admin">Home</a></li></ul></div></div><div id="container-1" class="container"><div id="row-1" class="row"><h1><b>amazing</b></h1></div></div>
\.


--
-- Data for Name: elements; Type: TABLE DATA; Schema: public; Owner: epadmin
--

COPY elements (id, name, content) FROM stdin;
\.


--
-- Name: elements_id_seq; Type: SEQUENCE SET; Schema: public; Owner: epadmin
--

SELECT pg_catalog.setval('elements_id_seq', 1, false);


--
-- Data for Name: info; Type: TABLE DATA; Schema: public; Owner: epadmin
--

COPY info (site_id, rev_date, title, theme) FROM stdin;
1	2014-08-16 17:39:58.6	EasyPress	3
\.


--
-- Data for Name: scripts; Type: TABLE DATA; Schema: public; Owner: epadmin
--

COPY scripts (name, content) FROM stdin;
editor	\n<script src="admin/lib/rangy/rangy-core.js"></script>\n<script src="admin/lib/rangy/rangy-cssclassapplier.js"></script>\n<script src="admin/lib/rangy/rangy-selectionsaverestore.js"></script>\n<script src="admin/lib/rangy/rangy-serializer.js"></script>\n<script src="admin/lib/rangy/rangy-textrange.js"></script>\n<script src="admin/lib/undo/undo.js"></script>\n<script src="admin/lib/medium/medium.js"></script>
\.


--
-- Data for Name: style; Type: TABLE DATA; Schema: public; Owner: epadmin
--

COPY style (style_id, rev_date, rules) FROM stdin;
38	2014-08-19 17:45:12.201	<style type="text/css" class="user-style-sheet">body { padding-top: 60px; background-color: rgb(120, 60, 60); }.blog-module ng-scope { padding: 20px; }</style>
39	2014-08-19 17:46:05.07	<style type="text/css" class="user-style-sheet">body { padding-top: 60px; background-color: rgb(120, 60, 60); }.blog-module ng-scope { padding: 20px; }</style>
40	2014-08-19 17:46:08.178	<style type="text/css" class="user-style-sheet">body { padding-top: 60px; background-color: rgb(120, 60, 60); }.blog-module ng-scope { padding: 20px; }</style>
41	2014-08-19 17:47:53.702	<style type="text/css" class="user-style-sheet">body { padding-top: 60px; background-color: rgb(120, 60, 60); }.blog-module ng-scope { padding: 20px; }</style>
42	2014-08-20 01:00:07.254	<style type="text/css" class="user-style-sheet">body { padding-top: 60px; background-color: rgb(120, 60, 60); }.blog-module ng-scope { padding: 20px; }.ng-scope{background-color:rgb(255, 255, 255);}</style>
37	2014-08-18 23:27:05.342	<style type="text/css" class="user-style-sheet">body { padding-top: 60px; background-color: rgb(120, 60, 60); }.blog-module ng-scope { padding: 20px; }</style>
43	2014-08-20 01:30:52.461	<style type="text/css" class="user-style-sheet">body { padding-top: 60px; background-color: rgb(120, 60, 60); }.blog-module ng-scope { padding: 20px; }.ng-scope { background-color: rgb(255, 255, 255); }#row-1{color:rgb(0, 0, 0);}</style>
44	2014-08-22 04:02:32.073	<style type="text/css" class="user-style-sheet">body { padding-top: 60px; background-color: rgb(120, 60, 60); }.blog-module ng-scope { padding: 20px; }.ng-scope { background-color: rgb(255, 255, 255); }#row-1 { color: rgb(0, 0, 0); }</style>
45	2014-08-30 15:34:44.829	<style type="text/css" class="user-style-sheet">body { padding-top: 60px; background-color: rgb(120, 60, 60); }.blog-module ng-scope { padding: 20px; }.ng-scope { background-color: rgb(255, 255, 255); }#row-1 { color: rgb(0, 0, 0); }</style>
46	2014-08-30 15:35:20.938	<style type="text/css" class="user-style-sheet">body { padding-top: 60px; background-color: rgb(120, 60, 60); }.blog-module ng-scope { padding: 20px; }.ng-scope { background-color: rgb(255, 255, 255); }#row-1 { color: rgb(0, 0, 0); }</style>
47	2014-08-30 17:14:14.591	<style type="text/css" class="user-style-sheet">body { padding-top: 60px; background-color: rgb(120, 60, 60); }.blog-module ng-scope { padding: 20px; }.ng-scope { background-color: rgb(255, 255, 255); }#row-1 { color: rgb(0, 0, 0); }</style>
48	2014-08-30 17:14:52.057	<style type="text/css" class="user-style-sheet">body { padding-top: 60px; background-color: rgb(120, 60, 60); }.blog-module ng-scope { padding: 20px; }.ng-scope { background-color: rgb(255, 255, 255); }#row-1 { color: rgb(0, 0, 0); }</style>
49	2014-08-30 17:23:39.791	<style type="text/css" class="user-style-sheet">body { padding-top: 60px; background-color: rgb(120, 60, 60); }.blog-module ng-scope { padding: 20px; }.ng-scope { background-color: rgb(255, 255, 255); }#row-1 { color: rgb(0, 0, 0); }</style>
50	2014-09-20 17:02:55.569	<style type="text/css" class="user-style-sheet">body { padding-top: 60px; background-color: rgb(120, 60, 60); }#row-1 { color: rgb(0, 0, 0); }</style>
51	2014-09-25 22:27:52.333	<style type="text/css" class="user-style-sheet">body { padding-top: 60px; background-color: rgb(120, 60, 60); }#row-1 { color: rgb(0, 0, 0); }</style>
52	2014-09-25 22:28:20.763	<style type="text/css" class="user-style-sheet">body { padding-top: 60px; background-color: rgb(120, 60, 60); }#row-1 { color: rgb(0, 0, 0); }</style>
53	2014-09-25 22:28:46.183	<style type="text/css" class="user-style-sheet">body { padding-top: 60px; background-color: rgb(120, 60, 60); }#row-1 { color: rgb(0, 0, 0); }</style>
54	2014-09-25 22:30:21.103	<style type="text/css" class="user-style-sheet">body { padding-top: 60px; background-color: rgb(120, 60, 60); }#row-1 { color: rgb(0, 0, 0); }</style>
55	2014-09-25 22:30:46.492	<style type="text/css" class="user-style-sheet">body { padding-top: 60px; background-color: rgb(120, 60, 60); }#row-1 { color: rgb(0, 0, 0); }</style>
56	2014-09-25 22:58:03.694	<style type="text/css" class="user-style-sheet">body { padding-top: 60px; background-color: rgb(255, 255, 255); }#row-1 { color: rgb(0, 0, 0); }</style>
57	2014-09-25 22:59:09.074	<style type="text/css" class="user-style-sheet">body { padding-top: 60px; background-color: rgb(255, 255, 255); }#row-1 { color: rgb(0, 0, 0); }</style>
\.


--
-- Name: styles_style_id_seq; Type: SEQUENCE SET; Schema: public; Owner: epadmin
--

SELECT pg_catalog.setval('styles_style_id_seq', 57, true);


--
-- Name: test_rev_id_seq; Type: SEQUENCE SET; Schema: public; Owner: epadmin
--

SELECT pg_catalog.setval('test_rev_id_seq', 45, true);


--
-- Data for Name: theme; Type: TABLE DATA; Schema: public; Owner: epadmin
--

COPY theme (theme_id, name, theme_url) FROM stdin;
1	Amelia	/admin/css/custom-theme/amelia.css
2	Cerulean	/admin/css/custom-theme/cerulean.css
3	Cosmo	/admin/css/custom-theme/cosmo.css
4	Cyborg	/admin/css/custom-theme/cyborg.css
5	Darkly	/admin/css/custom-theme/darkly.css
6	Flatly	/admin/css/custom-theme/flatly.css
7	Journal	/admin/css/custom-theme/journal.css
8	Lumen	/admin/css/custom-theme/lumen.css
9	Readable	/admin/css/custom-theme/readable.css
10	Simplex	/admin/css/custom-theme/simplex.css
11	Slate	/admin/css/custom-theme/slate.css
12	Spacelab	/admin/css/custom-theme/spacelab.css
13	Superhero	/admin/css/custom-theme/superhero.css
\.


--
-- Name: theme_theme_id_seq; Type: SEQUENCE SET; Schema: public; Owner: epadmin
--

SELECT pg_catalog.setval('theme_theme_id_seq', 13, true);


--
-- Name: MaritasBlog_pkey; Type: CONSTRAINT; Schema: public; Owner: epadmin; Tablespace: 
--

ALTER TABLE ONLY "MaritasBlog"
    ADD CONSTRAINT "MaritasBlog_pkey" PRIMARY KEY (blog_id);


--
-- Name: account_alias_key; Type: CONSTRAINT; Schema: public; Owner: epadmin; Tablespace: 
--

ALTER TABLE ONLY account
    ADD CONSTRAINT account_alias_key UNIQUE (alias);


--
-- Name: account_pkey; Type: CONSTRAINT; Schema: public; Owner: epadmin; Tablespace: 
--

ALTER TABLE ONLY account
    ADD CONSTRAINT account_pkey PRIMARY KEY (userid);


--
-- Name: elements_pkey; Type: CONSTRAINT; Schema: public; Owner: epadmin; Tablespace: 
--

ALTER TABLE ONLY elements
    ADD CONSTRAINT elements_pkey PRIMARY KEY (name);


--
-- Name: scripts_pkey; Type: CONSTRAINT; Schema: public; Owner: epadmin; Tablespace: 
--

ALTER TABLE ONLY scripts
    ADD CONSTRAINT scripts_pkey PRIMARY KEY (name);


--
-- Name: styles_pkey; Type: CONSTRAINT; Schema: public; Owner: epadmin; Tablespace: 
--

ALTER TABLE ONLY style
    ADD CONSTRAINT styles_pkey PRIMARY KEY (style_id);


--
-- Name: test_pkey; Type: CONSTRAINT; Schema: public; Owner: epadmin; Tablespace: 
--

ALTER TABLE ONLY body
    ADD CONSTRAINT test_pkey PRIMARY KEY (rev_id);


--
-- Name: theme_pkey; Type: CONSTRAINT; Schema: public; Owner: epadmin; Tablespace: 
--

ALTER TABLE ONLY theme
    ADD CONSTRAINT theme_pkey PRIMARY KEY (theme_id);


--
-- Name: uno; Type: CONSTRAINT; Schema: public; Owner: epadmin; Tablespace: 
--

ALTER TABLE ONLY account
    ADD CONSTRAINT uno UNIQUE (username);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- Name: account; Type: ACL; Schema: public; Owner: epadmin
--

REVOKE ALL ON TABLE account FROM PUBLIC;
REVOKE ALL ON TABLE account FROM epadmin;
GRANT ALL ON TABLE account TO epadmin;


--
-- PostgreSQL database dump complete
--

