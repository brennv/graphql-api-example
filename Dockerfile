FROM node:6.3.1

ADD package.json /tmp/package.json
RUN set -ex \
	&& cd /tmp \
	&& npm install \
	&& mkdir -p /opt/graphql \
	&& cp -a /tmp/node_modules /opt/graphql/ \
	&& rm -Rf /tmp/*

WORKDIR /opt/graphql
ADD . /opt/graphql

# CMD ["npm", "start"]

# Wait for postgres to initialize
RUN chmod +x /opt/graphql/start.sh
CMD ["/opt/graphql/start.sh"]
