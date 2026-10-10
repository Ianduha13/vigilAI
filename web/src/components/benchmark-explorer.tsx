"use client";

import { useState, type KeyboardEvent } from "react";
import { ArrowRight, Check, Code2, CornerDownRight } from "lucide-react";
import { benchmarks, links } from "@/lib/content";

export function BenchmarkExplorer() {
  const [selected, setSelected] = useState(0);
  const [language, setLanguage] = useState<"pt" | "en">("pt");
  const item = benchmarks[selected];

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (["ArrowDown", "ArrowRight"].includes(event.key)) next = (index + 1) % benchmarks.length;
    else if (["ArrowUp", "ArrowLeft"].includes(event.key)) next = (index - 1 + benchmarks.length) % benchmarks.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = benchmarks.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    document.getElementById(`tab-${benchmarks[next].id}`)?.focus();
  }

  return <div className="benchmark-explorer">
    <div className="benchmark-tabs" role="tablist" aria-label="Brazil-specific benchmarks" aria-orientation="vertical">
      {benchmarks.map((benchmark, index) => <button key={benchmark.id} type="button" role="tab" id={`tab-${benchmark.id}`} aria-controls="benchmark-panel" aria-selected={selected === index} tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={event => navigate(event, index)} className={`benchmark-tab ${selected === index ? "selected" : ""}`}>
        <span className="tab-number">{benchmark.number}</span><span><strong>{benchmark.name}</strong><small>{benchmark.article}</small></span><ArrowRight size={17}/>
      </button>)}
      <p className="mapping-note">Article references follow the project’s benchmark mapping. <a href={links.bill}>View the bill <ArrowRight size={12}/></a></p>
    </div>
    <div id="benchmark-panel" role="tabpanel" aria-labelledby={`tab-${item.id}`} tabIndex={0} className="benchmark-panel">
      <div className="panel-meta"><span className="scope-pill">{item.scope}</span><span className="mono">{item.number} / 05</span></div>
      <h3>{item.title}</h3><p className="panel-description">{item.description}</p>
      <div className="prompt-example"><div className="prompt-top"><span><CornerDownRight size={14}/> ILLUSTRATIVE QUESTION</span><div role="group" aria-label="Question language"><button type="button" aria-pressed={language === "pt"} onClick={() => setLanguage("pt")}>PT-BR</button><button type="button" aria-pressed={language === "en"} onClick={() => setLanguage("en")}>EN</button></div></div><p lang={language === "pt" ? "pt-BR" : "en"}>{language === "pt" ? item.promptPt : item.promptEn}</p></div>
      <div className="criteria"><span className="mini-label">WHAT THE BENCHMARK EXAMINES</span>{item.criteria.map(criterion => <div key={criterion}><Check size={15}/><span>{criterion}</span></div>)}</div>
      <div className="panel-footer"><span><Code2 size={14}/>{item.task}</span><span>{item.paired ? `Paired with ${item.paired}` : "Brazil-specific addition"}</span></div>
    </div>
  </div>;
}
