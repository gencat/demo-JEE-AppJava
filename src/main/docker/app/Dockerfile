FROM gencatcloud/tomcat:7

COPY setenv.sh /opt/tomcat/bin/
COPY mysql-connector-java-5.1.8-bin.jar /opt/tomcat/lib/

CMD ["/entrypoint.sh"]