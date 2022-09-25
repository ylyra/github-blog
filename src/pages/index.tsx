import axios, { CancelTokenSource } from "axios";
import { formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import debounce from "lodash.debounce";
import truncate from "lodash.truncate";
import { ArrowSquareOut, GithubLogo, Users } from "phosphor-react";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link as DefaultLink } from "react-router-dom";
import remarkGfm from "remark-gfm";

import { Container } from "../components/Container";
import { Input } from "../components/Form/Input";
import { Head } from "../components/Head";
import { Link } from "../components/Link";
import { api } from "../services/api";

type UserProps = {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  company?: string;
  bio?: string;
  followers: number;
};

type IssueProps = {
  number: number;
  title: string;
  user: UserProps;
  html_url: string;
  created_at: string;
  body: string;
  id: number;
};

let cancelToken: CancelTokenSource;
const MainPage = () => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [issues, setIssues] = useState<IssueProps[]>([]);

  useEffect(() => {
    (async () => {
      const userResponse = await api.get<UserProps>("/users/ylyra");
      setUser(userResponse.data);

      const issuesResponse = await api.get(
        "/repos/rocketseat-education/reactjs-github-blog-challenge/issues"
      );
      setIssues(issuesResponse.data);
    })();
  }, []);

  const _searchIssues = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      try {
        const value = e.target.value;

        if (!value) return;

        if (cancelToken) {
          cancelToken.cancel("Operation canceled due to new request.");
        }

        cancelToken = axios.CancelToken.source();

        const response = await api.get("/search/issues", {
          params: {
            q: `${value} repo:rocketseat-education/reactjs-github-blog-challenge`,
          },
        });

        setIssues(response.data.items);
      } catch {}
    },
    []
  );

  const searchIssues = debounce(_searchIssues, 700);

  return (
    <>
      <Head>
        <title>Github Blog</title>
      </Head>

      <Container className="pb-20 max-w-[942px]">
        {user && (
          <section className="-mt-20 mb-16 p-8 pl-10 rounded-[10px] bg-blue-800 shadow flex gap-8">
            <img
              src={user.avatar_url}
              alt="Github profile picture"
              className="w-[148px] h-[148px] rounded-lg object-cover object-center"
            />

            <div className="relative w-full flex justify-between flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h1 className="text-blue-50 text-2xl">{user.name}</h1>
                {user.bio && <p className="text-blue-200">{user.bio}</p>}
              </div>

              <div className="flex gap-6 items-center">
                <Link
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  leftIcon={<GithubLogo size={18} />}
                >
                  {user.login}
                </Link>
                {user.company && (
                  <Link
                    href={user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    leftIcon={<GithubLogo size={18} />}
                  >
                    {user.company}
                  </Link>
                )}
                <Link
                  href={`${user.html_url}?tab=followers`}
                  target="_blank"
                  rel="noopener noreferrer"
                  leftIcon={<Users weight="fill" size={18} />}
                >
                  {user.followers} seguidores
                </Link>
              </div>

              <div className="absolute top-0 right-0">
                <Link
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="text-blue-500"
                  iconColor="text-blue-500"
                  rightIcon={<ArrowSquareOut size={18} />}
                >
                  Github
                </Link>
              </div>
            </div>
          </section>
        )}

        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-bold text-blue-100">Publicações</h2>

            <small className="text-sm text-blue-300">6 publicações</small>
          </div>
          <Input
            name="search"
            type="search"
            autoComplete="off"
            placeholder="Buscar conteúdo"
            onChange={searchIssues}
          />
        </section>

        <section className="grid grid-cols-2 gap-8 mt-12">
          {issues.map((issue) => (
            <DefaultLink
              key={issue.id}
              to={`/posts/${issue.number}`}
              className="flex flex-col gap-5 relative p-8 rounded-[10px] bg-blue-700 text-blue-200 border-2 border-blue-700 hover:border-blue-400 transition-all duration-300"
            >
              <div className="flex items-start">
                <h3 className="flex-1 text-xl font-bold text-blue-50">
                  {issue.title}
                </h3>
                <span className="text-sm text-blue-300">
                  {formatDistanceToNow(new Date(issue.created_at), {
                    locale: ptBR,
                    addSuffix: true,
                  })}
                </span>
              </div>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {truncate(issue.body, {
                  length: 180,
                })}
              </ReactMarkdown>
            </DefaultLink>
          ))}
        </section>
      </Container>
    </>
  );
};

export default MainPage;
