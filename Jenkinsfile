pipeline {
    agent any
    stages {
         stage('Docker build') {
                    steps {
                        sh 'echo ======= docker build ====='
                        sh 'docker-compose stop'
                        sh 'cp .env.example .env.prod'

                        sh 'docker-compose build'
                        sh 'docker-compose up -d'
                        sh 'echo ======= docker stop ====='
                    }
                }

        stage('Start app') {
                    steps {
                        sh 'docker exec --tty web3api yarn install'
                        sh 'docker exec --tty web3api yarn build'
                        sh 'docker exec --tty web3api yarn start&'
                    }
        }
    }
}