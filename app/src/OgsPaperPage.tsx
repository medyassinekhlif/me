import { useMemo } from 'react'
import { FaArrowRight, FaCodeBranch, FaGithub } from 'react-icons/fa6'
import paperSource from './content/ogs-paper.md?raw'

type HeadingBlock = {
  kind: 'heading'
  level: number
  text: string
  id: string
}

type ParagraphBlock = {
  kind: 'paragraph'
  text: string
}

type ListBlock = {
  kind: 'list'
  ordered: boolean
  items: string[]
}

type TableBlock = {
  kind: 'table'
  caption?: string
  headers: string[]
  rows: string[][]
}

type RuleBlock = {
  kind: 'rule'
}

type ParsedBlock = HeadingBlock | ParagraphBlock | ListBlock | TableBlock | RuleBlock

const externalLinks = {
  openGenerativeStudios: 'https://opengenerativestudios.studio',
  musicGen: 'https://arxiv.org/abs/2306.05284',
  midi: 'https://midi.org/',
  randomForests: 'https://doi.org/10.1023/A:1010933404324',
  markovChains: 'https://en.wikipedia.org/wiki/Markov_chain',
  vst: 'https://www.steinberg.net/vst-developers/',
  vst3: 'https://steinbergmedia.github.io/vst3_dev_portal/pages/index.html',
  sfz: 'https://sfzformat.com/',
  sfizz: 'https://sfztools.github.io/sfizz/',
  juce: 'https://juce.com/',
  juceLegal: 'https://juce.com/juce-legal/',
  spitfireLabs: 'https://labs.spitfireaudio.com/',
  kontakt: 'https://www.native-instruments.com/en/products/komplete/samplers/kontakt-8/',
  virtualPlayingOrchestra: 'https://virtualplaying.com/',
  docker: 'https://docs.docker.com/',
  seda: 'https://doi.org/10.1145/502034.502057',
  autoregressive: 'https://en.wikipedia.org/wiki/Autoregressive_model',
  diffusion: 'https://en.wikipedia.org/wiki/Diffusion_model',
  spectrogram: 'https://en.wikipedia.org/wiki/Spectrogram',
  waveform: 'https://en.wikipedia.org/wiki/Waveform',
  daw: 'https://en.wikipedia.org/wiki/Digital_audio_workstation',
  gpu: 'https://en.wikipedia.org/wiki/Graphics_processing_unit',
  microservice: 'https://martinfowler.com/articles/microservices.html',
}

const linkedTerms = [
  ['Open Generative Studios', externalLinks.openGenerativeStudios],
  ['Staged Event-Driven Architecture', externalLinks.seda],
  ['Virtual Playing Orchestra', externalLinks.virtualPlayingOrchestra],
  ['digital audio workstation', externalLinks.daw],
  ['raw-audio generation', externalLinks.musicGen],
  ['sample-based synthesis', externalLinks.sfz],
  ['headless audio rendering', externalLinks.sfizz],
  ['autoregressive', externalLinks.autoregressive],
  ['diffusion models', externalLinks.diffusion],
  ['diffusion', externalLinks.diffusion],
  ['spectrograms', externalLinks.spectrogram],
  ['spectrogram', externalLinks.spectrogram],
  ['waveforms', externalLinks.waveform],
  ['waveform', externalLinks.waveform],
  ['random forests', externalLinks.randomForests],
  ['random forest', externalLinks.randomForests],
  ['Markov chains', externalLinks.markovChains],
  ['Markov chain', externalLinks.markovChains],
  ['Spitfire Labs', externalLinks.spitfireLabs],
  ['MusicGen', externalLinks.musicGen],
  ['Kontakt', externalLinks.kontakt],
  ['Docker', externalLinks.docker],
  ['microservice', externalLinks.microservice],
  ['microservices', externalLinks.microservice],
  ['VST3', externalLinks.vst3],
  ['VST', externalLinks.vst],
  ['SFZ', externalLinks.sfz],
  ['sfizz', externalLinks.sfizz],
  ['JUCE', externalLinks.juce],
  ['MIDI', externalLinks.midi],
  ['DAW', externalLinks.daw],
  ['GPU', externalLinks.gpu],
  ['SEDA', externalLinks.seda],
] as const

const sortedLinkedTerms = [...linkedTerms].sort((a, b) => b[0].length - a[0].length)
const termLookup = new Map(sortedLinkedTerms.map(([term, href]) => [term.toLowerCase(), href]))
const termMatcher = new RegExp(
  `(${sortedLinkedTerms.map(([term]) => escapeRegExp(term)).join('|')})`,
  'gi',
)

const technicalLinks = [
  ['Open Generative Studios', externalLinks.openGenerativeStudios],
  ['MusicGen', externalLinks.musicGen],
  ['MIDI', externalLinks.midi],
  ['Random forests', externalLinks.randomForests],
  ['Markov chains', externalLinks.markovChains],
  ['VST / VST3', externalLinks.vst3],
  ['SFZ', externalLinks.sfz],
  ['sfizz', externalLinks.sfizz],
  ['JUCE', externalLinks.juce],
  ['Virtual Playing Orchestra', externalLinks.virtualPlayingOrchestra],
  ['Docker', externalLinks.docker],
  ['SEDA', externalLinks.seda],
]

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function headingId(text: string) {
  const plainText = text.replace(/^\d+\.\s*/, '')

  if (plainText === 'Abstract') return 'abstract'
  if (plainText.startsWith('Introduction')) return 'introduction'
  if (plainText.startsWith('Background')) return 'background'
  if (plainText.startsWith('Statistical')) return 'modeling'
  if (plainText.startsWith('Evaluating')) return 'rendering'
  if (plainText.startsWith('System')) return 'implementation'
  if (plainText.startsWith('Sample')) return 'libraries'
  if (plainText.startsWith('Architectural')) return 'synthesis'
  if (plainText.startsWith('Limitations')) return 'limitations'
  if (plainText.startsWith('Future')) return 'future'
  if (plainText.startsWith('Generalizable')) return 'lessons'
  if (plainText.startsWith('Conclusion')) return 'conclusion'
  if (plainText.startsWith('References')) return 'references'

  return plainText
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function parseMarkdown(source: string): ParsedBlock[] {
  const lines = source.replace(/\r\n/g, '\n').split('\n')
  const blocks: ParsedBlock[] = []
  let paragraph: string[] = []
  let pendingCaption: string | undefined

  const flushParagraph = () => {
    if (paragraph.length === 0) return
    const text = paragraph.join(' ').replace(/\s+/g, ' ').trim()
    paragraph = []

    if (!text) return
    if (text.startsWith('Table ')) {
      pendingCaption = text
      return
    }

    blocks.push({ kind: 'paragraph', text })
  }

  for (let index = 0; index < lines.length; index += 1) {
    const rawLine = lines[index]
    const line = rawLine.trim()

    if (!line) {
      flushParagraph()
      continue
    }

    const headingMatch = line.match(/^(#{2,3})\s+(.+)$/)
    if (headingMatch) {
      flushParagraph()
      const text = headingMatch[2]
      blocks.push({ kind: 'heading', level: headingMatch[1].length, text, id: headingId(text) })
      continue
    }

    if (/^-{3,}$/.test(line)) {
      flushParagraph()
      blocks.push({ kind: 'rule' })
      continue
    }

    if (line.startsWith('|')) {
      flushParagraph()
      const tableLines: string[] = []
      while (index < lines.length && lines[index].trim().startsWith('|')) {
        tableLines.push(lines[index].trim())
        index += 1
      }
      index -= 1

      const rows = tableLines
        .filter((tableLine) => !/^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(tableLine))
        .map((tableLine) => tableLine.replace(/^\||\|$/g, '').split('|').map((cell) => cell.trim()))

      const [headers, ...bodyRows] = rows
      if (headers && bodyRows.length > 0) {
        blocks.push({ kind: 'table', caption: pendingCaption, headers, rows: bodyRows })
        pendingCaption = undefined
      }
      continue
    }

    if (/^(\d+\.|-)\s+/.test(line)) {
      flushParagraph()
      const ordered = /^\d+\./.test(line)
      const items: string[] = []

      while (index < lines.length) {
        const itemLine = lines[index].trim()
        const itemMatch = itemLine.match(ordered ? /^\d+\.\s+(.+)$/ : /^-\s+(.+)$/)
        if (!itemMatch) break
        items.push(itemMatch[1])
        index += 1
      }
      index -= 1
      blocks.push({ kind: 'list', ordered, items })
      continue
    }

    paragraph.push(line)
  }

  flushParagraph()
  return blocks
}

function renderInline(text: string) {
  return text.split(termMatcher).map((part, index) => {
    const href = termLookup.get(part.toLowerCase())

    if (!href) {
      return part
    }

    return (
      <a
        key={`${part}-${index}`}
        href={href}
        target="_blank"
        rel="noreferrer"
        className="font-semibold text-violet-700 underline decoration-violet-200 underline-offset-4 transition hover:text-violet-900 hover:decoration-violet-400"
      >
        {part}
      </a>
    )
  })
}

function PaperTable({ block }: { block: TableBlock }) {
  return (
    <div className="overflow-hidden border border-slate-300 bg-slate-50">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          {block.caption ? (
            <caption className="px-4 py-3 text-center text-sm font-medium text-slate-700">
              {renderInline(block.caption)}
            </caption>
          ) : null}
          <thead className="bg-slate-100 text-slate-900">
            <tr>
              {block.headers.map((header) => (
                <th key={header} scope="col" className="px-4 py-3 font-semibold">
                  {renderInline(header)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-700">
            {block.rows.map((row) => (
              <tr key={row.join('|')} className="align-top">
                {row.map((cell, index) => (
                  <td
                    key={`${row[0]}-${index}`}
                    className={`px-4 py-3 ${index === 0 ? 'font-semibold text-slate-900' : ''}`}
                  >
                    {renderInline(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function PaperBlock({ block }: { block: ParsedBlock }) {
  if (block.kind === 'heading') {
    if (block.level === 2) {
      return (
        <h2 id={block.id} className="scroll-mt-24 pt-4 font-display text-2xl font-semibold text-slate-950 md:text-3xl">
          {renderInline(block.text)}
        </h2>
      )
    }

    return <h3 className="pt-2 font-display text-xl font-semibold text-slate-800">{renderInline(block.text)}</h3>
  }

  if (block.kind === 'list') {
    const ListTag = block.ordered ? 'ol' : 'ul'

    return (
      <ListTag className="space-y-3 text-base leading-8 text-slate-800">
        {block.items.map((item) => (
          <li key={item} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            {renderInline(item)}
          </li>
        ))}
      </ListTag>
    )
  }

  if (block.kind === 'table') {
    return <PaperTable block={block} />
  }

  if (block.kind === 'rule') {
    return <hr className="border-slate-200" />
  }

  if (block.text.startsWith('Keywords:')) {
    return (
      <p className="rounded-lg border border-violet-200 bg-violet-50 p-4 text-sm leading-7 text-violet-800">
        {renderInline(block.text)}
      </p>
    )
  }

  return <p className="text-base leading-8 text-slate-700">{renderInline(block.text)}</p>
}


function OgsPaperPage() {
  const logoUrl = 'https://raw.githubusercontent.com/medyassinekhlif/open-generative-studios/refs/heads/main/logo.png'
  const navLogoUrl = 'https://raw.githubusercontent.com/medyassinekhlif/open-generative-studios/refs/heads/main/nav-logo.png'
  const blocks = useMemo(() => parseMarkdown(paperSource), [])
  const outline = blocks.filter((block): block is HeadingBlock => block.kind === 'heading' && block.level === 2)

  return (
    <main className="min-h-screen bg-slate-100 font-body text-slate-900">
      <header className="fixed inset-x-0 top-0 z-40 bg-white/90 backdrop-blur-lg border-b border-slate-200/40 shadow-sm">
        <nav className="flex w-full items-center justify-between gap-3 px-6 py-3 md:px-8">
          <a
            href={externalLinks.openGenerativeStudios}
            className="inline-flex min-w-0 items-center gap-2 font-display text-base font-semibold text-slate-900 sm:text-lg"
          >
            <img
              src={navLogoUrl}
              alt="OGS"
              className="h-full max-h-12 w-auto object-contain"
            />
          </a>

          <a
            href="https://medyassinekhlif.github.io/me"
            className="inline-flex items-center gap-2 rounded-full bg-violet-700 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-violet-800"
          >
            Get back <FaArrowRight className="text-[0.65rem]" />
          </a>
        </nav>
      </header>

      <section className="relative isolate overflow-hidden border-b border-slate-200 bg-slate-50 pt-20">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:44px_44px]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(130deg,rgba(167,139,250,0.08),transparent_38%,rgba(139,92,246,0.06)_66%,rgba(196,181,253,0.06))]" />
        <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16 relative">
          <img
            src={logoUrl}
            alt="Logo"
            className="pointer-events-none absolute left-0 -bottom-10 z-0 h-72 w-auto -rotate-12 opacity-20 sm:h-80"
          />
          <div className="max-w-4xl relative z-10">
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-slate-900 md:text-6xl">
              From Black Boxes to Open Formats
            </h1>
            <p className="mt-5 text-xl leading-8 text-slate-700 md:text-2xl">
              The audio engine behind {renderInline('Open Generative Studios')}
            </p>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
              A technical report on the audio-rendering architecture of Open Generative Studios.
            </p>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">

              Prepared by Mohamed Yassine Khlif, April 2026.

            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 md:px-8 lg:grid-cols-[minmax(0,1fr)_18rem] bg-slate-100">
        <article className="min-w-0 space-y-5 rounded-lg border border-slate-200 bg-white p-8 shadow-xl shadow-slate-300/30 text-slate-900">
          <div className="space-y-8">
            {blocks.map((block, index) => (
              <PaperBlock key={`${block.kind}-${index}`} block={block} />
            ))}
          </div>
        </article>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/50">
            <h2 className="font-display text-base font-semibold text-slate-900">Contents</h2>
            <nav className="mt-3 space-y-1 text-sm">
              {outline.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="block rounded-md px-2 py-1.5 text-slate-700 transition hover:bg-slate-100 hover:text-violet-700"
                >
                  {item.text.replace(/^\d+\.\s*/, '')}
                </a>
              ))}
            </nav>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/50">
            <div className="flex items-center gap-2">
              <FaCodeBranch className="text-violet-500" />
              <h2 className="font-display text-base font-semibold text-slate-900">
                Technical Links
              </h2>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {technicalLinks.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:border-violet-300/60 hover:text-violet-700"
                >
                  {label}
                </a>
              ))}
            </div>
          </section>

          <a
            href="https://github.com/medyassinekhlif"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between gap-3 rounded-lg bg-violet-700 p-4 text-sm font-semibold text-white transition hover:bg-violet-800"
          >
            <span className="inline-flex items-center gap-2">
              <FaGithub /> GitHub
            </span>
            <FaArrowRight />
          </a>
        </aside>
      </div>
    </main>
  )
}

export default OgsPaperPage
