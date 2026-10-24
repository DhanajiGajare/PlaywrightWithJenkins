pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
        timestamps()
    }

    triggers {
        githubPush()
    }

    environment {
        CI = 'true'
    }

    stages {
        stage('Main branch CI') {
            when {
                expression {
                    !env.BRANCH_NAME || env.BRANCH_NAME == 'main'
                }
            }

            stages {
                stage('Checkout') {
                    steps {
                        checkout scm
                    }
                }

                stage('Install Dependencies') {
                    steps {
                        script {
                            if (isUnix()) {
                                sh 'npm ci'
                            } else {
                                bat 'npm ci'
                            }
                        }
                    }
                }

                stage('Install Playwright Chromium') {
                    steps {
                        script {
                            if (isUnix()) {
                                sh 'npx playwright install chromium'
                            } else {
                                bat 'npx playwright install chromium'
                            }
                        }
                    }
                }

                stage('Run Tests') {
                    steps {
                        script {
                            if (isUnix()) {
                                sh 'npm test'
                            } else {
                                bat 'npm test'
                            }
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts(
                artifacts: 'playwright-report/**, test-results/**',
                allowEmptyArchive: true
            )
        }

        success {
            echo 'Jenkins pipeline completed successfully.'
        }

        failure {
            echo 'Some tests failed. Check the Jenkins console output and archived reports.'
        }
    }
}
