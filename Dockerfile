
FROM node:16-alpine


WORKDIR /app

RUN apk update && apk add --no-cache openssl
# 设置时区为中国东八区，这里的配置可以被docker-compose.yml或docker run时指定的时区覆盖
ENV TZ="Asia/Shanghai"

RUN echo "http://mirrors.aliyun.com/alpine/latest-stable/main" > /etc/apk/repositories && \
    echo "http://mirrors.aliyun.com/alpine/latest-stable/community" >> /etc/apk/repositories && \
    apk update && \
    apk upgrade zlib && \
    rm -rf /var/cache/apk/*

# 如果各公司有自己的私有源，可以替换registry地址,如使用官方源注释下一行
RUN npm config set registry https://registry.npmmirror.com

# 安装开发期依赖
COPY package.json ./package.json
RUN npm install
# 构建项目
COPY . .
RUN npm run build
# 删除开发期依赖
RUN rm -rf node_modules && rm package-lock.json    
# 安装生产环境依赖   
RUN npm install --production  

# 日志文件挂载                        

# 如果端口更换，这边可以更新一下
EXPOSE 7001

CMD ["npm", "run", "start_prod"]