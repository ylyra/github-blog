import axios, { CancelTokenSource } from "axios";
import { formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import debounce from "lodash.debounce";
import truncate from "lodash.truncate";
import {
  ArrowLeft,
  ArrowSquareOut,
  Calendar,
  ChatTeardrop,
  GithubLogo,
  Users,
} from "phosphor-react";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link as DefaultLink, useParams } from "react-router-dom";
import remarkGfm from "remark-gfm";

import { Container } from "../../components/Container";
import { Input } from "../../components/Form/Input";
import { Head } from "../../components/Head";
import { Link } from "../../components/Link";
import { api } from "../../services/api";

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
  comments: number;
};

let cancelToken: CancelTokenSource;
const PostItem = () => {
  const { id } = useParams();
  const [issue, setIssue] = useState<IssueProps | null>(null);

  useEffect(() => {
    (async () => {
      const issuesResponse = await api.get(
        `/repos/rocketseat-education/reactjs-github-blog-challenge/issues/${id}`
      );
      setIssue(issuesResponse.data);
    })();
  }, [id]);

  if (!issue) return <span>Loading...</span>;

  return (
    <>
      <Head>
        <title>Github Blog</title>
      </Head>

      <Container className="pb-20 max-w-[942px]">
        <section className="-mt-20 mb-16 p-8 pl-10 rounded-[10px] bg-blue-800 shadow flex flex-col gap-8">
          <div className="flex items-center justify-between gap-2">
            <Link
              href="/"
              color="text-blue-500"
              iconColor="text-blue-500"
              leftIcon={<ArrowLeft size={18} />}
            >
              VOLTAR
            </Link>
            <Link
              href={issue.html_url}
              target="_blank"
              rel="noopener noreferrer"
              color="text-blue-500"
              iconColor="text-blue-500"
              rightIcon={<ArrowSquareOut size={18} />}
            >
              VER NO GITHUB
            </Link>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <h1 className="text-blue-50 text-2xl font-bold ">{issue.title}</h1>

            <div className="flex gap-6 items-center">
              <Link
                href={issue.user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                leftIcon={<GithubLogo size={18} />}
              >
                {issue.user.login}
              </Link>

              <Link
                href={issue.html_url}
                target="_blank"
                rel="noopener noreferrer"
                leftIcon={<Calendar size={18} weight="fill" />}
              >
                {formatDistanceToNow(new Date(issue.created_at), {
                  locale: ptBR,
                  addSuffix: true,
                })}
              </Link>

              <Link
                href={issue.html_url}
                target="_blank"
                rel="noopener noreferrer"
                leftIcon={<ChatTeardrop size={18} weight="fill" />}
              >
                {issue.comments} comentário(s)
              </Link>
            </div>
          </div>
        </section>

        <section className="p-8">
          <ReactMarkdown
            className="text-blue-200 prose lg:prose-xl"
            remarkPlugins={[remarkGfm]}
          >
            {issue?.body}
          </ReactMarkdown>
        </section>
      </Container>
    </>
  );
};

export default PostItem;
