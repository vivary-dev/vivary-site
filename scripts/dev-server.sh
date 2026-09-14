#!/usr/bin/env bash
# Start the Next.js dev server for vivary-site detached on port 3177.
cd /home/workspace/Projects/vivary-site || exit 1
if curl -sf -o /dev/null -m 3 http://127.0.0.1:3177/; then
  echo "already serving on 3177"
  exit 0
fi
pkill -f "next dev --hostname 127.0.0.1 --port 3177" 2>/dev/null || true
nohup setsid pnpm exec next dev --hostname 127.0.0.1 --port 3177 > /tmp/vivary-site-dev.log 2>&1 < /dev/null &
for i in $(seq 1 30); do
  sleep 2
  if curl -sf -o /dev/null -m 5 http://127.0.0.1:3177/; then
    echo "serving on 3177 after $((i*2))s"
    exit 0
  fi
done
echo "dev server did not come up"; tail -20 /tmp/vivary-site-dev.log; exit 1
