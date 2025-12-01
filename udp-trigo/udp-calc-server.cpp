#include <iostream>
#include <cstring>
#include <unistd.h>
#include <cmath>
#include <arpa/inet.h>

#define PORT 9001
#define BUF_SIZE 1024

double toRadians(double value, bool isDeg) {
    return isDeg ? value * M_PI / 180.0 : value;
}

int main() {
    int sockfd;
    char buffer[BUF_SIZE];
    struct sockaddr_in servaddr, cliaddr;

    sockfd = socket(AF_INET, SOCK_DGRAM, 0);
    if (sockfd < 0) {
        perror("Socket creation failed");
        exit(EXIT_FAILURE);
    }

    memset(&servaddr, 0, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_addr.s_addr = INADDR_ANY;
    servaddr.sin_port = htons(PORT);

    if (bind(sockfd, (struct sockaddr *)&servaddr, sizeof(servaddr)) < 0) {
        perror("Bind failed");
        exit(EXIT_FAILURE);
    }

    socklen_t len = sizeof(cliaddr);
    while (true) {
        int n = recvfrom(sockfd, buffer, BUF_SIZE, 0, (struct sockaddr *)&cliaddr, &len);
        buffer[n] = '\0';

        std::string input(buffer);
        if (input == "quit") break;

        char func[10], unit[10] = "rad";
        double value;
        sscanf(buffer, "%s %lf %s", func, &value, unit);

        bool isDeg = (strcmp(unit, "deg") == 0);
        double result = 0.0;

        if (strcmp(func, "sin") == 0)
            result = sin(toRadians(value, isDeg));
        else if (strcmp(func, "cos") == 0)
            result = cos(toRadians(value, isDeg));
        else if (strcmp(func, "tan") == 0)
            result = tan(toRadians(value, isDeg));
        else
            snprintf(buffer, BUF_SIZE, "Invalid function");

        snprintf(buffer, BUF_SIZE, "Result: %.6f", result);
        sendto(sockfd, buffer, strlen(buffer), 0, (struct sockaddr *)&cliaddr, len);
    }

    close(sockfd);
    return 0;
}
