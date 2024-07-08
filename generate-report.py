import sys
import asyncio
import os
import io
from gpt_researcher import GPTResearcher

# Set the encoding to UTF-8
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
os.environ["USER_AGENT"] = "tonton"
os.environ["TAVILY_API_KEY"] = "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"

async def fetch_report(query, report_type):
    try:
        researcher = GPTResearcher(query=query, report_type=report_type, config_path=None)
        await researcher.conduct_research()
        report = await researcher.write_report()
        with open("public/research_report.md", "w", encoding="utf-8") as f:
            f.write(report)
    except Exception as e:
        print(f"Error during research: {e}")
        sys.exit(1)  # Ensure the script exits with an error code

async def main():
    if len(sys.argv) < 3:
        print("Usage: python generate-report.py <query> <report_type>")
        sys.exit(1)

    query = sys.argv[1]
    report_type = sys.argv[2]
    await fetch_report(query, report_type)

if __name__ == "__main__":
    asyncio.run(main())
