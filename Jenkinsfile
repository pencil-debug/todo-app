pipeline
{
    agent any

    enviroment
    {
        IMAGE="boxofpencil/todo-app:v1"
    }

    stages
    {
        stage('Build docker image')
        {
            steps
            {
                """
                docker build -t $IMAGE .
                """
            }
        }
        stage('docker login')
        {
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

                    docker tag todo-app:v1 $DOCKER_USER/todo-app:v1

                    docker push $DOCKER_USER/todo-app:v1
                    '''
                }
            }

        }
        stage('Deploy Kubernetes') {
            steps {
                sh """

                kubectl apply -f k8s/

                """
            }
        }
    }
}