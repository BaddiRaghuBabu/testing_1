"use client";

import React, { useMemo, useState } from "react";
import { FileCode2 } from "lucide-react";

import langchainIcon from "@/assets/index/compatibility/langchain.jpeg?url";
import llamaindexIcon from "@/assets/index/compatibility/llamaindex.png?url";
import pineconeIcon from "@/assets/index/compatibility/pinecone.svg?url";
import huggingfaceIcon from "@/assets/index/compatibility/huggingface.svg?url";
import pytorchIcon from "@/assets/index/compatibility/pytorch.svg?url";
import openaiIcon from "@/assets/index/compatibility/openai.svg?url";
import vllmIcon from "@/assets/index/compatibility/vllm.svg?url";
import ollamaIcon from "@/assets/index/compatibility/ollama.svg?url";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

import type { BundledLanguage } from "@/components/ui/kibo-ui-code-block";
import {
  CodeBlock,
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockFiles,
  CodeBlockHeader,
  CodeBlockItem,
} from "@/components/ui/kibo-ui-code-block";

const TOOL_ICONS: Record<string, { src: string; invertOnDark?: boolean; alt: string }> = {
  LangChain: {
    src: langchainIcon,
    alt: "LangChain",
  },
  LlamaIndex: {
    src: llamaindexIcon,
    alt: "LlamaIndex",
  },
  Pinecone: {
    src: pineconeIcon,
    invertOnDark: true,
    alt: "Pinecone",
  },
  "Hugging Face": {
    src: huggingfaceIcon,
    alt: "Hugging Face Transformers",
  },
  PyTorch: {
    src: pytorchIcon,
    alt: "PyTorch",
  },
  OpenAI: {
    src: openaiIcon,
    invertOnDark: true,
    alt: "OpenAI",
  },
  vLLM: {
    src: vllmIcon,
    alt: "vLLM",
  },
  Ollama: {
    src: ollamaIcon,
    alt: "Ollama",
  },
};

function HeaderToolIcon({ toolName }: { toolName: string }) {
  const icon = TOOL_ICONS[toolName];
  const BOX = "h-[25px] w-[25px]";

  if (!icon) {
    return (
      <span className={cn("inline-flex shrink-0 items-center justify-center overflow-hidden", BOX)}>
        <FileCode2 className="text-muted-foreground h-[18px] w-[18px]" />
      </span>
    );
  }

  return (
    <span className={cn("inline-flex shrink-0 items-center justify-center overflow-hidden", BOX)}>
      <img
        src={icon.src}
        alt={`${icon.alt} icon`}
        className={cn("block h-full w-full object-contain", icon.invertOnDark ? "dark:invert" : "")}
        loading="lazy"
        decoding="async"
      />
    </span>
  );
}

const languages = [
  {
    name: "LangChain",
    lang: "python",
    filename: "langchain_agent_workflow.py",
    code: `import os
from langchain_openai import ChatOpenAI
from langchain.agents import AgentExecutor, create_tool_calling_agent
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.tools import tool

POLICY_SNIPPETS = {
    "retention": "Data is retained for 7 years; PII is deleted on request within 30 days.",
    "access": "Access is RBAC + least-privilege; all reads are logged and reviewed weekly.",
}

@tool
def search_policy(topic: str) -> str:
    """Lookup a short internal policy snippet by topic."""
    return POLICY_SNIPPETS.get(topic.lower(), "No policy found for that topic.")

@tool
def calc(expr: str) -> str:
    """Evaluate a simple arithmetic expression like '1200*0.18'."""
    allowed = set("0123456789.+-*/() ")
    if any(c not in allowed for c in expr): return "Rejected: invalid characters."
    return str(eval(expr, {"__builtins__": {}}))

tools = [search_policy, calc]
llm = ChatOpenAI(model=os.getenv("OPENAI_MODEL", "gpt-5"), temperature=0)

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a compliance-aware enterprise AI agent. Use tools when needed."),
    ("human", "{input}"),
    ("placeholder", "{agent_scratchpad}"),
])

agent = create_tool_calling_agent(llm, tools, prompt)
executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

result = executor.invoke({"input": "Summarize our retention policy and compute GST on 1200 at 18%."})
print(result["output"])`,
  },
  {
    name: "LlamaIndex",
    lang: "python",
    filename: "llamaindex_rag_qa.py",
    code: `import os, pathlib
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader, StorageContext, load_index_from_storage
from llama_index.core.node_parser import SentenceSplitter

DATA_DIR = os.getenv("DOCS_DIR", "data/policies")
PERSIST_DIR = os.getenv("INDEX_DIR", "storage/policies")

def build_index() -> VectorStoreIndex:
    docs = SimpleDirectoryReader(DATA_DIR).load_data()
    splitter = SentenceSplitter(chunk_size=512, chunk_overlap=64)
    nodes = splitter.get_nodes_from_documents(docs)
    index = VectorStoreIndex(nodes)
    index.storage_context.persist(persist_dir=PERSIST_DIR)
    return index

def load_or_build() -> VectorStoreIndex:
    if pathlib.Path(PERSIST_DIR).exists():
        sc = StorageContext.from_defaults(persist_dir=PERSIST_DIR)
        return load_index_from_storage(sc)
    return build_index()

index = load_or_build()
qe = index.as_query_engine(similarity_top_k=4)

q = "What are the access-control requirements? Answer with bullet points and cite sources."
resp = qe.query(q)

print(resp.response)
for sn in resp.source_nodes[:3]:
    meta = sn.node.metadata or {}
    print("-", meta.get("file_name", "source"), "score=", round(sn.score or 0, 3))`,
  },
  {
    name: "Pinecone",
    lang: "python",
    filename: "pinecone_vector_upsert_query.py",
    code: `import os
from pinecone.grpc import PineconeGRPC as Pinecone
from sentence_transformers import SentenceTransformer

pc = Pinecone(api_key=os.environ["PINECONE_API_KEY"])
index = pc.Index(host=os.environ["PINECONE_INDEX_HOST"])

embedder = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

docs = [
    {"id": "pol_001", "text": "Retention: 7 years; delete PII within 30 days.", "dept": "compliance"},
    {"id": "pol_002", "text": "Access: RBAC + least privilege; audit logs retained.", "dept": "security"},
    {"id": "pol_003", "text": "Incident: Sev1 notify in 15 minutes; postmortem in 48 hours.", "dept": "ops"},
]

vectors = embedder.encode([d["text"] for d in docs], normalize_embeddings=True).tolist()
upserts = [
    {"id": d["id"], "values": v, "metadata": {"dept": d["dept"], "text": d["text"]}}
    for d, v in zip(docs, vectors)
]

index.upsert(vectors=upserts, namespace="valuenode")
qvec = embedder.encode("How fast do we notify on Sev1 incidents?", normalize_embeddings=True).tolist()

res = index.query(vector=qvec, top_k=3, include_metadata=True, namespace="valuenode")
for m in res.matches:
    print(m.id, round(m.score, 3), "-", m.metadata.get("text", "")[:70])`,
  },
  {
    name: "Hugging Face",
    lang: "python",
    filename: "hf_transformers_inference_pipeline.py",
    code: `import os
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline

MODEL = os.getenv("HF_MODEL", "Qwen/Qwen2.5-0.5B-Instruct")

tokenizer = AutoTokenizer.from_pretrained(MODEL)
dtype = torch.float16 if torch.cuda.is_available() else torch.float32

model = AutoModelForCausalLM.from_pretrained(
    MODEL,
    torch_dtype=dtype,
    device_map="auto",
)

gen = pipeline("text-generation", model=model, tokenizer=tokenizer)

prompt = (
    "System: You are a helpful enterprise assistant.\\n"
    "User: Draft a 6-bullet SOP for month-end close exceptions.\\n"
    "Assistant:"
)

out = gen(
    prompt,
    max_new_tokens=220,
    do_sample=True,
    temperature=0.7,
    top_p=0.9,
    return_full_text=False,
)

print(out[0]["generated_text"].strip())`,
  },
  {
    name: "PyTorch",
    lang: "python",
    filename: "pytorch_lora_finetune.py",
    code: `import torch
import torch.nn as nn

class LoRALinear(nn.Module):
    def __init__(self, in_f: int, out_f: int, r: int = 8, alpha: float = 16.0):
        super().__init__()
        self.base = nn.Linear(in_f, out_f, bias=False)
        for p in self.base.parameters(): p.requires_grad = False
        self.A = nn.Linear(in_f, r, bias=False)
        self.B = nn.Linear(r, out_f, bias=False)
        self.scale = alpha / r

    def forward(self, x):
        return self.base(x) + self.B(self.A(x)) * self.scale

torch.manual_seed(7)
model = nn.Sequential(LoRALinear(32, 64), nn.GELU(), LoRALinear(64, 4))
opt = torch.optim.AdamW([p for p in model.parameters() if p.requires_grad], lr=3e-3)
loss_fn = nn.CrossEntropyLoss()

for step in range(200):
    x = torch.randn(64, 32)
    y = torch.randint(0, 4, (64,))
    logits = model(x)
    loss = loss_fn(logits, y)
    opt.zero_grad()
    loss.backward()
    opt.step()
    if step % 50 == 0:
        print("step", step, "loss", round(loss.item(), 4))`,
  },
  {
    name: "OpenAI",
    lang: "python",
    filename: "openai_tool_calling_agent.py",
    code: `import os, json
from openai import OpenAI

client = OpenAI()
MODEL = os.getenv("OPENAI_MODEL", "gpt-5")

KB = {
    "invoice_policy": "Invoices are net-30. Disputes must be raised within 10 business days.",
    "sla": "Sev1: 15-min ack, 2-hr mitigation. Sev2: 1-hr ack, 8-hr mitigation.",
}

def search_kb(topic: str) -> dict:
    return {"topic": topic, "result": KB.get(topic, "Not found")}

tools = [{
    "type": "function",
    "name": "search_kb",
    "description": "Search a tiny internal knowledge base by topic key.",
    "parameters": {
        "type": "object",
        "properties": {"topic": {"type": "string"}},
        "required": ["topic"],
        "additionalProperties": False,
    },
    "strict": True,
}]

input_list = [{"role": "user", "content": "What is our SLA for Sev1? Use the KB and answer in 2 bullets."}]
resp = client.responses.create(model=MODEL, tools=tools, input=input_list)

for item in resp.output:
    if item.type != "function_call": continue
    args = json.loads(item.arguments)
    result = search_kb(**args)
    input_list.append({"type": "function_call_output", "call_id": item.call_id, "output": json.dumps(result)})

final = client.responses.create(model=MODEL, tools=tools, input=input_list)
print(final.output_text)`,
  },
  {
    name: "vLLM",
    lang: "python",
    filename: "vllm_openai_compatible_server.py",
    code: `import os, signal, subprocess, time
from openai import OpenAI

MODEL = os.getenv("VLLM_MODEL", "NousResearch/Meta-Llama-3-8B-Instruct")
API_KEY = os.getenv("VLLM_API_KEY", "token-abc123")
BASE_URL = os.getenv("VLLM_BASE_URL", "http://localhost:8000/v1")

cmd = ["vllm", "serve", MODEL, "--dtype", "auto", "--api-key", API_KEY]
proc = subprocess.Popen(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)

try:
    time.sleep(5)
    client = OpenAI(base_url=BASE_URL, api_key=API_KEY)
    r = client.chat.completions.create(
        model=MODEL,
        messages=[{"role": "user", "content": "Draft a secure RAG architecture in 6 bullets."}],
        temperature=0.3,
    )
    print(r.choices[0].message.content)
finally:
    proc.send_signal(signal.SIGINT)
    proc.wait(timeout=20)`,
  },
  {
    name: "Ollama",
    lang: "python",
    filename: "ollama_local_inference.py",
    code: `import os
from ollama import chat, embed

MODEL = os.getenv("OLLAMA_MODEL", "llama3.2")
DOCS = [
    "Retention: 7 years; delete PII within 30 days.",
    "Access: RBAC + least privilege; audit logs retained.",
]

vecs = embed(model=MODEL, input=DOCS)["embeddings"]
qvec = embed(model=MODEL, input="How long do we retain audit logs?")["embeddings"][0]

def cos(a, b):
    s = sum(x*y for x, y in zip(a, b))
    na = sum(x*x for x in a) ** 0.5
    nb = sum(x*x for x in b) ** 0.5
    return s / (na * nb + 1e-9)

best = max(range(len(DOCS)), key=lambda i: cos(qvec, vecs[i]))
context = DOCS[best]

resp = chat(model=MODEL, messages=[
    {"role": "system", "content": "Answer using the provided context only."},
    {"role": "user", "content": f"Context: {context}\\n\\nQ: How long are logs retained?"},
])

print(resp["message"]["content"])`,
  },
] as const;

type CompatibilityProps = {
  className?: string;
};

export function Compatibility({ className }: CompatibilityProps) {
  type ToolName = (typeof languages)[number]["name"];

  const [activeTab, setActiveTab] = useState<ToolName>(languages[0].name);

  const PANEL_WIDTH = "max-w-5xl";
  const CODE_WINDOW_H = "h-[320px] lg:h-[420px]";

  const activeItem = useMemo(
    () => languages.find((x) => x.name === activeTab) ?? languages[0],
    [activeTab],
  );
  const codeData = useMemo(
    () => [
      {
        language: activeItem.lang,
        filename: activeItem.filename,
        code: activeItem.code,
        toolName: activeItem.name,
      },
    ],
    [activeItem],
  );

  const selectedLanguage = activeItem.lang;
  const handleTabValueChange = (value: string) => {
    if (languages.some((item) => item.name === value)) {
      setActiveTab(value as ToolName);
    }
  };

  return (
    <section className={cn("pt-16 pb-0", className)}>
      <div className="container">
        <div className="flex flex-col gap-4">
          <div className={cn("mx-auto w-full", PANEL_WIDTH)}>
            <div className="hidden lg:block">
              <Tabs value={activeTab} onValueChange={handleTabValueChange} className="w-full">
                <TabsList
                  className={cn(
                    "border-border/60 bg-background flex h-auto w-full items-center justify-start",
                    "rounded-full border px-2 py-2",
                    "overflow-x-auto whitespace-nowrap",
                    "gap-2",
                  )}
                >
                  {languages.map((item) => (
                    <TabsTrigger
                      key={item.name}
                      value={item.name}
                      className={cn(
                        "rounded-full px-2 py-2 text-[12px] leading-none font-normal 2xl:px-4 2xl:text-sm",
                        "text-foreground",

                        "data-[state=inactive]:bg-background data-[state=inactive]:shadow-none",
                        "data-[state=active]:bg-muted",
                        "data-[state=active]:shadow-none data-[state=inactive]:shadow-none",
                        "shadow-none ring-0 transition-colors outline-none",
                        "focus:ring-0 focus:outline-none active:ring-0 active:outline-none",
                        "focus-visible:border-transparent focus-visible:ring-0 focus-visible:outline-none",
                        "data-[state=inactive]:hover:bg-muted/40",
                        "data-[state=inactive]:focus-visible:bg-muted/40",
                      )}
                    >
                      {item.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
            <div className="lg:hidden">
              <Select value={activeTab} onValueChange={handleTabValueChange}>
                <SelectTrigger
                  className={cn(
                    "border-border/60 bg-background",
                    "h-12 w-full rounded-full border px-4",
                    "shadow-none focus-visible:ring-0",
                  )}
                >
                  <SelectValue placeholder="Select a tool" />
                </SelectTrigger>
                <SelectContent className="border-border/60 bg-background border shadow-none">
                  {languages.map((item) => (
                    <SelectItem
                      className="bg-background focus:bg-muted/40 data-highlighted:bg-muted/40"
                      key={item.name}
                      value={item.name}
                    >
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className={cn("mx-auto w-full", PANEL_WIDTH)}>
            <CodeBlock
              data={codeData}
              value={selectedLanguage}
              className={cn(
                "border-border/60 bg-muted/40 w-full overflow-hidden rounded-lg border shadow-none",
              )}
            >
              <CodeBlockHeader className={cn("bg-muted/40!", "border-border/60 border-b", "px-4")}>
                <CodeBlockFiles>
                  {(item) => (
                    <CodeBlockFilename
                      key={item.language}
                      value={item.language}
                      className={cn(
                        "border-0! bg-transparent! shadow-none!",
                        "rounded-none px-0 py-0",
                        "data-[state=active]:bg-transparent! data-[state=inactive]:bg-transparent!",
                        "hover:bg-transparent! focus:bg-transparent!",
                      )}
                    >
                      <span className="inline-flex items-center gap-3 bg-transparent text-xs leading-none">
                        <HeaderToolIcon toolName={activeItem.name} />
                        {item.filename}
                      </span>
                    </CodeBlockFilename>
                  )}
                </CodeBlockFiles>

                <CodeBlockCopyButton
                  className={cn(
                    "border-0! bg-transparent! text-slate-300 shadow-none! ring-0",
                    "hover:bg-white/5! focus-visible:bg-white/5!",
                  )}
                />
              </CodeBlockHeader>
              <ScrollArea className={cn("w-full bg-[#0b0f14]!", CODE_WINDOW_H)}>
                <div className="h-full">
                  <CodeBlockBody>
                    {(item) => (
                      <CodeBlockItem
                        key={item.language}
                        value={item.language}
                        className={cn(
                          "h-full w-full bg-[#0b0f14] text-slate-100",
                          "[&_.line]:before:text-slate-500/80",
                        )}
                      >
                        <CodeBlockContent
                          language={item.language as BundledLanguage}
                          themes={{
                            light: "github-dark-default",
                            dark: "github-dark-default",
                          }}
                        >
                          {item.code}
                        </CodeBlockContent>
                      </CodeBlockItem>
                    )}
                  </CodeBlockBody>
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </CodeBlock>
          </div>
        </div>
      </div>
    </section>
  );
}
