export default async function handler(req, res) {
  const apiKey = process.env.NVD_API_KEY;

  const cpe = 'cpe:2.3:o:fortinet:fortios:7.2.11:*:*:*:*:*:*:*';
  const encodedCPE = encodeURIComponent(cpe);
  const apiUrl = `https://api.nvd.nist.gov/rest/json/cves/2.0?cpeName=${encodedCPE}&resultsPerPage=200`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'apiKey': apiKey
      }
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erreur API NVD', detail: error.message });
  }
}
