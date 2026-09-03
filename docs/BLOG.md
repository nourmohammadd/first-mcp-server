# Building My First MCP Server: A 6-Week Journey

## The Starting Point
When I joined the NextFlows MCP Academy, I had never built a Model Context 
Protocol server before. The goal was simple to state and hard to do well: 
build something that lets an AI model access real data instead of guessing — 
and do it the way a real engineering team would, with a design phase, real 
data, security review, testing, and documentation.

I chose a "Quote of the Day" server: five tools that let a model fetch, 
search, and filter quotes from a real dataset instead of hallucinating them.

## Week 1-2: Skeleton and a Real Mistake
The first two weeks were about scaffolding — registering tools with stub 
handlers before writing any real logic, so the shape of the project was 
locked in early. I hit my first real lesson here: I accidentally started a 
later week's work from an outdated `main` branch instead of the branch that 
actually had my progress, and lost a session's worth of work. It taught me 
to always check which branch actually has the latest code before creating a 
new one.

I also had to migrate from an older MCP SDK package to a newer one 
(`@modelcontextprotocol/server`) partway through, which meant rewriting how 
the server started up — from the old transport-connect pattern to a cleaner 
`createServer()` + `serveStdio()` factory pattern.

## Week 3: Real Data
Stubs became real: three tools started reading from a local JSON fixture of 
quotes instead of returning placeholder text. I made a deliberate choice here 
— use a local file instead of a public quotes API — because that API had a 
history of going down, and I wanted the server to work offline on demo day. 
That decision paid off later.

## Week 4: Making It Safe
This was the week that changed how I think about the project. I wrote a 
threat model: what am I protecting, where does untrusted input enter my code, 
what are my top risks? Then I implemented real mitigations — restricting file 
reads to the data folder so nothing could read outside it, validating every 
tool input with Zod (length limits, trimming, type checks), and adding a host 
allowlist for any future network calls. I also went through a peer code 
review with a classmate, which caught things I'd missed simply because I was 
too close to my own code.

## Week 5: Proving It Works
I wrote a manual test plan covering happy paths, invalid input, and empty-data 
cases, then actually ran every case in the MCP Inspector and recorded the 
results. I rewrote the README from scratch so a complete stranger could set 
the project up using only the instructions — and tested that claim by asking 
a different classmate to clone the repo cold and time how long it took her to 
get a successful tool call. It took her about five minutes, no help from me.

I also connected the server to Claude Desktop for the first time, which 
surfaced a real bug: the server showed "disconnected" because it was 
resolving its data file relative to `C:\Windows\System32` instead of my 
project folder, since Claude Desktop launches the process differently than 
running it manually. I fixed it by having the code find its own data folder 
based on where the module itself lives, instead of trusting the working 
directory it happened to be launched from.

## Week 6: Shipping It
The final week was about making the project presentable: a public GitHub 
repo, a tagged `v1.0.0` release, a timed 3-5 minute demo script, and a slide 
deck. I verified the whole thing worked from a completely fresh clone on a 
separate folder before tagging it, because "works on my machine" isn't good 
enough for a real release.

Afterward, I went back and added write operations (add/update/delete tools) 
on top of the original read-only design, and ran a full CRUD test sequence 
through Claude Desktop to confirm create, update, and delete all worked and 
left the data in a consistent state.

## What I'd Tell Someone Starting This Program
Security and documentation are not the "boring parts" you rush through at the 
end — they're where most of the real learning happened for me. Writing the 
threat model forced me to actually think like an attacker about my own code. 
Having someone else run my README exposed assumptions I didn't know I was 
making. Both made the final project genuinely better, not just more thorough 
on paper.

## Project Links
- Repo: https://github.com/nourmohammadd/first-mcp-server
- Academy: https://nextflows.ai/