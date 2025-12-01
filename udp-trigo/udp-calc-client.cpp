#include <iostream>
#include <cstring>
#include <unistd.h>
#include <arpa/inet.h>

#define BUF_SIZE 1024

int main(int argc, char *argv[]) {
    if (argc != 3) {
        std::cerr << "Usage: " << argv[0] << " <server_ip> <port>" << std::endl;
        return 1;
    }

    int sockfd;
    char buffer[BUF_SIZE];
    struct sockaddr_in servaddr;

    sockfd = socket(AF_INET, SOCK_DGRAM, 0);
    if (sockfd < 0) {
        perror("Socket creation failed");
        exit(EXIT_FAILURE);
    }

    memset(&servaddr, 0, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_port = htons(atoi(argv[2]));
    servaddr.sin_addr.s_addr = inet_addr(argv[1]);

    socklen_t len = sizeof(servaddr);

    while (true) {
        std::cout << "Enter expression (e.g., sin 30 deg) or quit: ";
        std::string expr;
        std::getline(std::cin, expr);

        sendto(sockfd, expr.c_str(), expr.length(), 0, (struct sockaddr *)&servaddr, len);

        if (expr == "quit") break;

        int n = recvfrom(sockfd, buffer, BUF_SIZE, 0, (struct sockaddr *)&servaddr, &len);
        buffer[n] = '\0';
        std::cout << buffer << std::endl;
    }

    close(sockfd);
    return 0;
}
