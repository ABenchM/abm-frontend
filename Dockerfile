FROM node:10
COPY setup.sh /home
EXPOSE 3000
RUN cd /home;chmod a+x setup.sh; sh setup.sh