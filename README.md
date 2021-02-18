# s3-deployment-action

Github Action to create preview deployment on AWS S3 to view your changes

## Workflow example

Nowadays, action is only working with `pull_request` action types.

To use the following workflow, you just need to put it inside `.github/workflows` folders and it will be picked up by Github Actions.

```yml
name: Preview Deployment

on: [pull_request]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js 14.15.0
        uses: actions/setup-node@v1
        with:
          node-version: 14.15.0

      # Add your build `steps here before you push all static files to S3

      - name: Run deployment preview
        id: s3-preview-deployment-action
        uses: barecheck/s3-deployment-action@v0.1-beta.1
        with:
          source-dir: ./example
          s3-bucket-prefix: barecheck
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_REGION: ${{ secrets.AWS_REGION }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Inputs

| Key                     | Required | Default | Description                                                                              |
| ----------------------- | -------- | ------- | ---------------------------------------------------------------------------------------- |
| `source-dir`            | **yes**  | -       | Path to folder where all your static files located                                       |
| `s3-bucket-prefix`      | **yes**  | -       | Prefix for S3 bucket deployment previews. They will be created and removed on PR basics` |
| `AWS_ACCESS_KEY_ID`     | **yes**  | -       | Would be used to create/delete bucket and push files there                               |
| `AWS_SECRET_ACCESS_KEY` | **yes**  | -       | Secret for AWS_SECRET_ACCESS_KEY                                                         |
| `AWS_REGION`            | **yes**  | -       | AWS Region where bucket would be created and static files deployed                       |
| `GITHUB_TOKEN`          | **yes**  | -       | Your Github token in order to manage github deployments                                  |
