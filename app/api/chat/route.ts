import { streamText, convertToModelMessages, UIMessage } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: "openai/gpt-5-mini",
    system: `你是「朝向自由」網站裡的 AI 生活探索助手。
請用溫和、自然、具體的方式陪使用者探索自己。
不要說教，不要過度分析，也不要假裝自己是心理師。
可以透過提問幫助使用者整理想法。`,
    messages: await convertToModelMessages(messages),
  });

