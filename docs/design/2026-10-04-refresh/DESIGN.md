# Vivary website refresh

Status: review proposal, not approved for publication. Scope: the three existing public pages. Jeff asked to prioritize the product and a visual website refresh on October 4, 2026. This proposal supersedes the September 16 layout lock for this branch only. It preserves the existing identity and approved artwork.

## Overview

Help a visitor understand what Vivary does, see the actual workspace, and choose between the Windows preview and terminal documentation. The homepage leads with the product and download. The setup page presents installation in order. The commands page puts prerequisites and pinned commands before architecture detail.

Keep the three routes and existing fragment destinations. Preserve sourced product claims, public indexing, www.vivaryagent.xyz canonicals, generated Markdown, MCP and Content Signals. No hosting or DNS actions. This branch is a review preview only.

## Colors

Use existing site tokens from ../../brand/system/tokens.json: ground #080705, pane #0e0c09, rule #2a2419, rule-soft #1a1712, text #ebe5d8, text-2 #a69d8d, text-3 #837c6f. Amber #e9a23b remains reserved for records and focus. Product screenshots retain their actual app colors. No new palette, gradient, glow or shadow.

## Typography

Keep Big Shoulders for the headline and section headings, Geist Mono for the surrounding site, and Fraunces italic only in the memory-file example. Improve hierarchy through reading widths, paragraph length, spacing and scale rather than a new type identity. Actual app captures keep the app's own fonts.

## Layout

Maximum content width 1280px with responsive gutters. A two-column hero gives the introduction, download and setup link priority beside the unchanged mascot. The actual workspace follows early, with explicit version/provenance caption. Compact task examples and a memory-file example explain use without invented runtime activity. A quiet final section separates preview download from terminal documentation.

Documentation uses a clear page introduction, compact anchor navigation and numbered installation steps. Commands appear before layers and package history. At 360px, columns stack, navigation wraps and commands wrap without horizontal page scrolling. The same content remains readable without JavaScript.

## Elevation & Depth

Use existing one-pixel rules and solid surfaces. No shadows or decorative depth. Screenshot frames distinguish the app from website controls.

## Shapes

Preserve the jar lockup and artwork shapes. Square buttons and restrained rectangular panels follow the existing website. Do not crop, mirror, recolor or distort the character.

## Components

- Shared navigation: product overview, Windows setup, workspace commands, source. One primary download in the homepage hero.
- Hero: concise sourced description, approved static decorative character, release qualifier, download and setup links.
- Product figure: actual app capture with development-versus-download distinction. Never label a drawn specimen as a screenshot.
- Guide navigation: ordinary anchor links, visible keyboard focus and scroll offsets below the header.
- Setup steps: ordered list with short headings and full instructions.
- Command blocks: semantic pre/code, complete pinned commands and visible prerequisites.
- FAQ: visible questions and answers using the same data as JSON-LD.
- Footer: existing source, agent guidance and maker identity.

## Do's and Don'ts

Do retain the approved mascot's charcoal body, horns, leaf and markings in their original proportions. The public character name remains undecided. Keep the jar logo. Do label illustrative memory content and development captures honestly. Do preserve runtime-owned permissions and preview limitations.

Do not create new features, pricing, activity states, artwork or dependencies. Do not change deployment configuration, DNS or public crawler policy. Do not present the development screenshot as the September 22 downloadable build. The site preview needs Jeff's visual approval before live replacement.

## Wordmark and icon proposals

Jeff also requested a proper Vivary wordmark in place of the generic V, with matching desktop, taskbar and browser icons. The three proposals in [brand-options/review.html](brand-options/review.html) reuse canonical path letterforms and jar geometry. They compare a wordmark-only header with a quiet charcoal icon, the existing jar-and-name lockup, and a light icon tile. Option A is recommended for review. These files do not update app source, shipped icons, the website logo or the frozen Windows acceptance build. Selection and actual OS integration remain separate.

## Verification

Build with the canonical www origin and preview indexing disabled for review. Run the existing transport/export tests, lint, types and required dependency/UI scans. Render all three pages at 1440, 390 and 360px, inspect three critique passes, and test keyboard navigation, reduced motion, no-JavaScript reading, FAQ/schema parity and generated Markdown. Independently review the final diff. Record actual evidence and unverified items in DEVLOG.md.
