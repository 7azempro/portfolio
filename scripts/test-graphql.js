// Native fetch used

const PROJECT_ID = 'qqnr4pfl';
const DATASET = 'production';
const TAG = 'default';
const URL = `https://${PROJECT_ID}.api.sanity.io/v1/graphql/${DATASET}/${TAG}`;

const query = `
  query {
    allArticle(limit: 1) {
      title
      slug {
        current
      }
      seo {
        metaTitle
      }
    }
  }
`;

async function testGraphQL() {
    console.log(`Testing GraphQL Endpoint: ${URL}`);
    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query }),
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(`HTTP Error: ${response.status} - ${text}`);
        }

        const json = await response.json();
        console.log("GraphQL Response:", JSON.stringify(json, null, 2));

        if (json.errors) {
            console.error("GraphQL returned errors.");
            process.exit(1);
        } else {
            console.log("GraphQL Query Successful!");
        }

    } catch (error) {
        console.error("GraphQL Test Failed:", error.message);
        process.exit(1);
    }
}

testGraphQL();
