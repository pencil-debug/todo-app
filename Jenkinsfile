pipeline {
    agent any

    environment {
        IMAGE = "boxofpencil/todo-app:v2"
    }

    stages {

        stage('Build docker image') {
            steps {
                sh "docker build -t ${IMAGE} ."
            }
        }

        stage('Docker login and push') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    sh '''
                    echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin

                    docker tag $IMAGE $DOCKER_USER/todo-app:v2

                    docker push $DOCKER_USER/todo-app:v2
                    '''
                }
            }
        }

        stage('Deploy Kubernetes') {
            steps {
                sh '''
                kubectl apply -f k8s/
                '''
            }
        }
    }
}