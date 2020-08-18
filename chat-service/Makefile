IMAGE := kpatel20538/livestream-chat:chat
IMAGE_DEV := kpatel20538/livestream-chat:chat-dev

.PHONY: all
all: build push deploy

.PHONY: debug
build: $(TARGET_DEBUG)
	@sudo docker build --target prod -t $(IMAGE) .
	@sudo docker build --target dev -t $(IMAGE_DEV) .

.PHONY: clean
push:
	@sudo docker push $(IMAGE)
	@sudo docker push $(IMAGE_DEV) 

.PHONY: distclean
deploy:
	@kubectl apply -f ../k8s/chat-service.yml --wait
	@kubectl rollout restart deployment chat