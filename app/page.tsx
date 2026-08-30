import fs from "fs";
import path from "path";

export default function Home() {
  const file = path.join(process.cwd(), "public", "index.html");
  const html = fs.readFileSync(file, "utf8");
  const match = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  const body = match ? match[1] : html;

  return <div dangerouslySetInnerHTML={{ __html: body }} />;
}
