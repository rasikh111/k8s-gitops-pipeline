const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Application Chnanges successfully roled out with GitHub Actions + ArgoCD | End-to-End GitOps CI/CD Pipeline on Kubernetes RASIKH RIAZ!! );
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});

