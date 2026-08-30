import fs from "fs";
import path from "path";

export default function Home() {
  const file = path.join(process.cwd(), "public", "index.html");
  const html = fs.readFileSync(file, "utf8");

  const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);

  const head = headMatch ? headMatch[1] : "";
  const body = bodyMatch ? bodyMatch[1] : html;

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: head + body,
      }}
    />
  );
}
