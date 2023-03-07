.Phony: run pbcopy

run:
	deno run --allow-env --allow-read main.ts

pbcopy:
	deno run --allow-env --allow-read main.ts | pbcopy
