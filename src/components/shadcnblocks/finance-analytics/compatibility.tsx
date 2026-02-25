"use client";

import React, { useMemo, useState } from "react";
import { FileCode2 } from "lucide-react";

import cppIcon from "@/assets/finance-analytics/compatibility/cpp.svg?url";
import daxIcon from "@/assets/finance-analytics/compatibility/dax.svg?url";
import javascriptIcon from "@/assets/finance-analytics/compatibility/javascript.svg?url";
import postgresqlIcon from "@/assets/finance-analytics/compatibility/postgresql.svg?url";
import pythonIcon from "@/assets/finance-analytics/compatibility/python.svg?url";
import rIcon from "@/assets/finance-analytics/compatibility/r.svg?url";

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
  SQL: {
    src: postgresqlIcon,
    alt: "SQL",
  },
  Python: {
    src: pythonIcon,
    alt: "Python",
  },
  JavaScript: {
    src: javascriptIcon,
    alt: "JavaScript",
  },
  "C++": {
    src: cppIcon,
    alt: "C++",
  },
  R: {
    src: rIcon,
    alt: "R",
  },
  DAX: {
    src: daxIcon,
    alt: "DAX",
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
    name: "SQL",
    lang: "sql",
    filename: "qb_invoices_upsert_postgres.sql",
    code: `-- Postgres example: target table and upsert from a staging table
-- Assume staging.qb_invoices is loaded from QuickBooks API by an ETL job

CREATE TABLE IF NOT EXISTS qb_invoices (
  id TEXT PRIMARY KEY,
  doc_number TEXT,
  customer_name TEXT,
  txn_date DATE,
  due_date DATE,
  total NUMERIC(12,2),
  balance NUMERIC(12,2),
  created_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO qb_invoices (id, doc_number, customer_name, txn_date, due_date, total, balance)
SELECT id, doc_number, customer_name, txn_date, due_date, total, balance
FROM staging.qb_invoices
ON CONFLICT (id) DO UPDATE
SET doc_number = EXCLUDED.doc_number,
    customer_name = EXCLUDED.customer_name,
    txn_date = EXCLUDED.txn_date,
    due_date = EXCLUDED.due_date,
    total = EXCLUDED.total,
    balance = EXCLUDED.balance;`,
  },
  {
    name: "Python",
    lang: "python",
    filename: "xero_invoices_upsert_postgres.py",
    code: `# Fetch Xero invoices and upsert into Postgres
# env: XERO_TOKEN, XERO_TENANT_ID, DATABASE_URL
import os, requests, psycopg

token = os.getenv("XERO_TOKEN")
tenant = os.getenv("XERO_TENANT_ID")
resp = requests.get(
    "https://api.xero.com/api.xro/2.0/Invoices",
    headers={
        "Authorization": "Bearer " + token,
        "Xero-tenant-id": tenant,
        "Accept": "application/json",
    },
)
resp.raise_for_status()
inv = resp.json().get("Invoices", [])

with psycopg.connect(os.getenv("DATABASE_URL")) as conn:
    with conn.cursor() as cur:
        for i in inv:
            cur.execute(
                """
                INSERT INTO xero_invoices (id, number, contact, date, due, total, amount_due)
                VALUES (%s,%s,%s,%s,%s,%s,%s)
                ON CONFLICT (id) DO UPDATE
                SET number = EXCLUDED.number,
                    total = EXCLUDED.total,
                    amount_due = EXCLUDED.amount_due
                """,
                (
                    i.get("InvoiceID"),
                    i.get("InvoiceNumber"),
                    (i.get("Contact") or {}).get("Name"),
                    (i.get("DateString") or "")[:10],
                    (i.get("DueDateString") or "")[:10],
                    i.get("Total"),
                    i.get("AmountDue"),
                ),
            )
    conn.commit()`,
  },
  {
    name: "JavaScript",
    lang: "javascript",
    filename: "qbo_invoices_query_upsert_postgres.js",
    code: `// Node: QuickBooks Online query -> Postgres
// env: QBO_TOKEN, QBO_COMPANY_ID, DATABASE_URL
import fetch from "node-fetch";
import pg from "pg";

const token = process.env.QBO_TOKEN;
const companyId = process.env.QBO_COMPANY_ID;
const qbQuery = "SELECT Id, DocNumber, TxnDate, DueDate, TotalAmt, Balance, CustomerRef FROM Invoice STARTPOSITION 1 MAXRESULTS 50";
const url = "https://quickbooks.api.intuit.com/v3/company/" + companyId + "/query?query=" + encodeURIComponent(qbQuery);

const res = await fetch(url, {
  headers: {
    Authorization: "Bearer " + token,
    Accept: "application/json",
  },
});
const data = await res.json();
const invoices = (data.QueryResponse && data.QueryResponse.Invoice) || [];

const { Client } = pg;
const db = new Client({ connectionString: process.env.DATABASE_URL });
await db.connect();

for (const inv of invoices) {
  await db.query(
    "INSERT INTO qb_invoices (id, doc_number, txn_date, due_date, total, balance, customer_name) VALUES ($1,$2,$3,$4,$5,$6,$7) ON CONFLICT (id) DO UPDATE SET doc_number=EXCLUDED.doc_number, total=EXCLUDED.total, balance=EXCLUDED.balance;",
    [
      inv.Id,
      inv.DocNumber,
      inv.TxnDate,
      inv.DueDate,
      inv.TotalAmt,
      inv.Balance,
      inv.CustomerRef && inv.CustomerRef.name,
    ]
  );
}

await db.end();`,
  },
  {
    name: "C++",
    lang: "cpp",
    filename: "xero_contacts_upsert_postgres.cpp",
    code: `// C++: call Xero API with libcurl and upsert to Postgres with libpqxx
// compile with -lcurl -lpqxx -lpq
#include <cstdlib>
#include <string>
#include <iostream>
#include <curl/curl.h>
#include <nlohmann/json.hpp>
#include <pqxx/pqxx>

static size_t write_cb(void* contents, size_t size, size_t nmemb, void* userp) {
  size_t total = size * nmemb;
  std::string* s = reinterpret_cast<std::string*>(userp);
  s->append(reinterpret_cast<char*>(contents), total);
  return total;
}

int main() {
  std::string token = std::getenv("XERO_TOKEN");
  std::string tenant = std::getenv("XERO_TENANT_ID");

  CURL* curl = curl_easy_init();
  std::string body;
  struct curl_slist* headers = NULL;
  headers = curl_slist_append(headers, ("Authorization: Bearer " + token).c_str());
  headers = curl_slist_append(headers, ("Xero-tenant-id: " + tenant).c_str());
  headers = curl_slist_append(headers, "Accept: application/json");

  curl_easy_setopt(curl, CURLOPT_URL, "https://api.xero.com/api.xro/2.0/Contacts");
  curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
  curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_cb);
  curl_easy_setopt(curl, CURLOPT_WRITEDATA, &body);
  curl_easy_perform(curl);
  curl_easy_cleanup(curl);

  auto j = nlohmann::json::parse(body);
  pqxx::connection c(std::getenv("DATABASE_URL"));
  pqxx::work tx(c);
  for (auto& contact : j["Contacts"]) {
    tx.exec_params(
      "INSERT INTO xero_contacts (id, name) VALUES ($1,$2) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;",
      contact["ContactID"].get<std::string>(),
      contact["Name"].get<std::string>()
    );
  }
  tx.commit();
  return 0;
}`,
  },
  {
    name: "R",
    lang: "r",
    filename: "xero_invoices_load_postgres.R",
    code: `# R: Xero invoices -> Postgres
# env: XERO_TOKEN, XERO_TENANT_ID, DATABASE_URL
library(httr2)
library(jsonlite)
library(DBI)
library(RPostgres)

token <- Sys.getenv("XERO_TOKEN")
tenant <- Sys.getenv("XERO_TENANT_ID")

resp <- request("https://api.xero.com/api.xro/2.0/Invoices") |>
  req_headers(Authorization = paste("Bearer", token), \`Xero-tenant-id\` = tenant, Accept = "application/json") |>
  req_perform()

invoices <- fromJSON(resp_body_string(resp))$Invoices

con <- dbConnect(RPostgres::Postgres(), url = Sys.getenv("DATABASE_URL"))
cols <- c("InvoiceID","InvoiceNumber","DateString","DueDateString","Total","AmountDue")
dbWriteTable(con, "xero_invoices", invoices[cols], append = TRUE, row.names = FALSE)
dbDisconnect(con)`,
  },
  {
    name: "DAX",
    lang: "plaintext",
    filename: "finance_kpi_measures.dax",
    code: `-- Power BI DAX measures on QuickBooks/Xero model
AR Balance := SUM('Invoices'[AmountDue])

AR Days Outstanding :=
VAR todayDate = TODAY()
RETURN
  AVERAGEX(
    FILTER('Invoices', 'Invoices'[AmountDue] > 0),
    todayDate - 'Invoices'[DueDate]
  )

Gross Margin % :=
DIVIDE(
  SUM('GL'[Revenue]) - SUM('GL'[COGS]),
  SUM('GL'[Revenue])
)`,
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
    <section className={cn("pt-20 pb-0 md:pt-24 lg:pt-28", className)}>
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
