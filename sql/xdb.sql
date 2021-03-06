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
-- Name: user; Type: TABLE; Schema: public; Owner: epadmin; Tablespace: 
--

CREATE TABLE "user" (
    userid integer NOT NULL,
    firstname text,
    lastname text,
    email text,
    username text,
    password text
);


ALTER TABLE public."user" OWNER TO "epadmin";

--
-- Name: user_userid_seq; Type: SEQUENCE; Schema: public; Owner: epadmin
--

CREATE SEQUENCE user_userid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_userid_seq OWNER TO "epadmin";

--
-- Name: user_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: epadmin
--

ALTER SEQUENCE user_userid_seq OWNED BY "user".userid;


--
-- Name: userid; Type: DEFAULT; Schema: public; Owner: epadmin
--

ALTER TABLE ONLY "user" ALTER COLUMN userid SET DEFAULT nextval('user_userid_seq'::regclass);


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: epadmin
--

COPY "user" (userid, firstname, lastname, email, username, password) FROM stdin;
\.


--
-- Name: user_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: epadmin
--

SELECT pg_catalog.setval('user_userid_seq', 1, false);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

