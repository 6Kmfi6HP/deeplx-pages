import { Hono } from "hono";
import { renderer } from "./renderer";
import { query } from "@ifyour/deeplx";

const app = new Hono();

app.use(renderer);

app.get("/", (c) => {
  return c.render(
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">DeepLX Pages API 文档</h1>

      <h2 className="text-2xl font-semibold mt-8 mb-4">翻译接口</h2>
      <h3 className="text-xl font-semibold mb-4">POST /translate</h3>
      <p className="mb-4">将文本从一种语言翻译成另一种语言。</p>

      <h4 className="text-lg font-semibold mb-2">请求示例:</h4>
      <pre className="bg-gray-100 p-4 rounded-md mb-4">
        {JSON.stringify(
          {
            text: "要翻译的文本",
            source_lang: "源语言代码",
            target_lang: "目标语言代码",
          },
          null,
          2
        )}
      </pre>

      <h4 className="text-lg font-semibold mb-2">成功响应示例:</h4>
      <pre className="bg-gray-100 p-4 rounded-md mb-4">
        {JSON.stringify(
          {
            code: 200,
            message: "success",
            data: "Hello, world.",
            source_lang: "zh",
            target_lang: "en",
            alternatives: ["Hello, World.", "Hello, world!", "Hi, world."],
          },
          null,
          2
        )}
      </pre>

      <h4 className="text-lg font-semibold mb-2">支持的语言代码:</h4>
      <ul className="list-disc pl-6 mb-4">
        <li>en - 英语</li>
        <li>zh - 中文</li>
        <li>ja - 日语</li>
        <li>ko - 韩语</li>
        <li>es - 西班牙语</li>
        <li>fr - 法语</li>
        <li>de - 德语</li>
        <li>等其他 DeepL 支持的语言代码</li>
      </ul>

      <h4 className="text-lg font-semibold mb-2">错误响应示例:</h4>
      <pre className="bg-gray-100 p-4 rounded-md mb-4">
        {JSON.stringify(
          {
            error: "Translation failed",
            details: "具体错误信息",
          },
          null,
          2
        )}
      </pre>

      <h4 className="text-lg font-semibold mb-2">curl 示例:</h4>
      <pre className="bg-gray-100 p-4 rounded-md mb-4">
        {`curl --location 'http://your-domain/translate' \\
--header 'Content-Type: application/json' \\
--data '{
    "text": "你好，世界",
    "source_lang": "zh",
    "target_lang": "en"
}'`}
      </pre>
    </div>
  );
});

app.post("/translate", async (c) => {
  try {
    const body = await c.req.json();
    const result = await query(body);
    return c.json(result);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return c.json(
      {
        error: "Translation failed",
        details: errorMessage,
      },
      500
    );
  }
});

export default app;
