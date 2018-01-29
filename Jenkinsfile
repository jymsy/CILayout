pipeline {
  agent any
  stages {
    stage('test1') {
      steps {
        echo 'hello'
        sh 'pwd'
      }
    }
    stage('finish') {
      steps {
        sh 'ifconfig'
      }
    }
  }
}