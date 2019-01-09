deploy-test:
	npm run build:testing
	scp dist/index.html root@test.zhulogic.com://root/.jenkins/workspace/test-H5-zhulogic-design-top-app/dist/

deploy-prod:
	npm run build:prod
	scp dist/index.html zhangyl@120.55.125.14://usr/local/webapps/zhulogic-design-top-app/
