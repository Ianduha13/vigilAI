import { brand, links, researchRevision } from "@/lib/content";
import { emphasisRuns, fillName, formatTimestamp, overviewChapters, type OverviewTable } from "@/lib/project-overview";

function Narrative({ text }: { text: string }) {
  return <>{emphasisRuns(fillName(text, brand.name)).map((run, index) => run.em ? <em key={index}>{run.text}</em> : <span key={index}>{run.text}</span>)}</>;
}

function Table({ table }: { table: OverviewTable }) {
  return <div className="transcript-table-wrap">
    <table className="transcript-table">
      <caption>{table.caption}</caption>
      <thead><tr>{table.columns.map((column, index) => <th key={index} scope="col">{column || <span className="visually-hidden">Measure</span>}</th>)}</tr></thead>
      <tbody>{table.rows.map(row => <tr key={row[0]}><th scope="row">{row[0]}</th>{row.slice(1).map((cell, index) => <td key={index}>{cell}</td>)}</tr>)}</tbody>
    </table>
    <p className="transcript-visual">{table.note}</p>
  </div>;
}

/** The complete on-screen narrative of the film as HTML, generated from the same script as the video. */
export function FilmTranscript() {
  return <details id="film-transcript" className="film-transcript">
    <summary><span>Transcript</span><small>Complete on-screen narrative, figures and credits</small></summary>
    <div className="transcript-body">
      {overviewChapters.map(chapter => <section key={chapter.id} aria-labelledby={`transcript-${chapter.id}`}>
        <h3 id={`transcript-${chapter.id}`}><span>{chapter.number}</span>{chapter.title}<time dateTime={`PT${chapter.start}S`}>{formatTimestamp(chapter.start)}–{formatTimestamp(chapter.end)}</time></h3>
        {chapter.beats.map(beat => <div key={beat.id} className="transcript-beat">
          {beat.heading && <h4>{fillName(beat.heading, brand.name)}</h4>}
          {beat.text && <p><Narrative text={beat.text}/></p>}
          {beat.items && <ul>{beat.items.map(item => <li key={item}><Narrative text={item}/></li>)}</ul>}
          {beat.table && <Table table={beat.table}/>}
          {beat.visual && <p className="transcript-visual"><span>On screen</span>{fillName(beat.visual, brand.name)}</p>}
        </div>)}
      </section>)}
      <p className="transcript-sources">
        Figures are transcribed from versioned research artifacts at evidence snapshot <code>{researchRevision.slice(0, 7)}</code>:{" "}
        <a href={links.corrections}>results and retractions</a>, <a href={links.haiku}>Haiku 4.5</a> and <a href={links.sonnet}>Sonnet 4.6</a> run summaries, and the <a href={links.census}>matched-axis census</a>.
        The source code is in the <a href={links.repository}>repository</a>. Music: original instrumental composition, synthesized in code for this film.
      </p>
    </div>
  </details>;
}
