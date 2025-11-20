import click
import os
from base import execute_command, get_json

@click.command()
@click.option('--debug/--no-debug', default=False)
@click.pass_context
def cli(ctx, debug):
    ctx.color = True

    commit_hash = os.environ.get('DRONE_COMMIT_SHA')
    branch = os.environ.get('DRONE_COMMIT_BRANCH')           
    base_branch = os.environ.get('BASE_BRANCH', 'main')    
    target_branch = os.environ.get('DRONE_TARGET_BRANCH')    
    repo_name = os.environ.get("DRONE_REPO_NAME")

    if not commit_hash or not branch:
        click.secho("❌ Missing required Drone CI environment variables!", fg="red")
        return

    _, diff = execute_command(
        f'git diff-tree --no-commit-id --name-only -r {commit_hash}',
        preserve_output=True
    )

    click.secho(f"📦 Repository: {repo_name}", fg="yellow")
    click.secho(f"🌿 Source Branch: {branch}", fg="yellow")
    click.secho(f"🎯 Target Branch: {target_branch}", fg="yellow")
    click.secho(f"📂 Base Branch: {base_branch}", fg="yellow")
    click.secho(f"🔍 Changed Files:\n{diff}", fg="cyan")

    # Files to invalidate for prod
    prod_paths = [
        '/inbound-ui/html-template/assets/widgets/config.json',
        '/inbound-ui/html-template/assets/widgets/index.editor.css',
        '/inbound-ui/html-template/assets/widgets/index.editor.js.LICENSE.txt',
        '/inbound-ui/html-template/assets/widgets/index.view.css',
        '/inbound-ui/html-template/assets/widgets/index.view.js',
        '/inbound-ui/html-template/assets/widgets/index.editor.js'
    ]

    # Files to invalidate for staging
    staging_paths = [
        '/inbound-ui/html-template/staging/assets/widgets/config.json',
        '/inbound-ui/html-template/staging/assets/widgets/index.editor.css',
        '/inbound-ui/html-template/staging/assets/widgets/index.editor.js.LICENSE.txt',
        '/inbound-ui/html-template/staging/assets/widgets/index.view.css',
        '/inbound-ui/html-template/staging/assets/widgets/index.view.js',
        '/inbound-ui/html-template/staging/assets/widgets/index.editor.js'
    ]

    # --- Prod deployment ---
    if branch == base_branch:
        click.secho('🚀 Starting deployment for PROD', fg='green')
        #execute_command('npm ci', exit_on_error=True)
        #execute_command('npm run build', exit_on_error=True)

        # Push build to S3
        #execute_command(
        #    'aws s3 sync build s3://jssdk/inbound-ui/html-template/assets/widgets/ --acl public-read',
        #    exit_on_error=True
        #)

        # CloudFront invalidation
        #execute_command(
        #    f"aws cloudfront create-invalidation "
        #    f"--distribution-id E2YY7XDYMUDJAK "
        #    f"--paths {' '.join(prod_paths)}",
        #    exit_on_error=True
        #)

    # --- Staging deployment ---
    elif target_branch == base_branch:
        click.secho('🔄 Starting deployment for STAGING (PR to main)', fg='blue')
        execute_command('npm ci', exit_on_error=True)
        execute_command('npm run build', exit_on_error=True)

        # Push build to S3
        execute_command(
            'aws s3 sync build s3://jssdk/inbound-ui/html-template/staging/assets/widgets/ --acl public-read',
            exit_on_error=True
        )

        # CloudFront invalidation
        execute_command(
            f"aws cloudfront create-invalidation "
            f"--distribution-id E2YY7XDYMUDJAK "
            f"--paths {' '.join(staging_paths)}",
            exit_on_error=True
        )

    # --- No deployment ---
    else:
        click.secho(
            'ℹ️ Not a merge to main or a PR to main — skipping build.',
            fg='magenta'
        )

if __name__ == '__main__':
    cli(obj={})
