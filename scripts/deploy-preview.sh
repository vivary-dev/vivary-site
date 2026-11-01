#!/usr/bin/env bash
# The former preview address is now the public canonical site.
# Keep old invocations from silently publishing a different indexing policy.
echo "Use scripts/deploy-site.sh to publish the reviewed public site."
echo "For an unpublished local preview, build with NEXT_PUBLIC_PREVIEW=1."
exit 1
