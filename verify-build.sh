#!/bin/bash

# Comprehensive build verification script
# This script runs all checks to ensure the build will succeed on Vercel

set -e  # Exit on any error

echo "========================================="
echo "  BUILD VERIFICATION SCRIPT"
echo "========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track results
ERRORS=0

echo "Step 1: TypeScript Type Check"
echo "------------------------------"
if pnpm tsc --noEmit; then
    echo -e "${GREEN}✓ TypeScript check PASSED${NC}"
else
    echo -e "${RED}✗ TypeScript check FAILED${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo ""

echo "Step 2: ESLint Check"
echo "------------------------------"
if pnpm lint; then
    echo -e "${GREEN}✓ ESLint check PASSED${NC}"
else
    echo -e "${RED}✗ ESLint check FAILED${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo ""

echo "Step 3: Production Build"
echo "------------------------------"
if pnpm build; then
    echo -e "${GREEN}✓ Production build PASSED${NC}"
else
    echo -e "${RED}✗ Production build FAILED${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo ""

echo "========================================="
echo "  VERIFICATION SUMMARY"
echo "========================================="
if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✓ ALL CHECKS PASSED!${NC}"
    echo -e "${GREEN}✓ Ready for Vercel deployment${NC}"
    exit 0
else
    echo -e "${RED}✗ $ERRORS CHECK(S) FAILED${NC}"
    echo -e "${RED}✗ Fix errors before deploying${NC}"
    exit 1
fi

