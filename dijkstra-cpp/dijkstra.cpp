#include <iostream>
#include <vector>
#include <queue>
#include <climits>
using namespace std;

// Function to implement Dijkstra's Algorithm
void dijkstra(int V, vector<vector<pair<int, int>>> &adj, int src) {
    // Distance vector to store shortest distance from src to each vertex
    vector<int> dist(V, INT_MAX);

    // Min-heap priority queue: {distance, vertex}
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;

    // Distance to the source is 0
    dist[src] = 0;
    pq.push({0, src});

    while (!pq.empty()) {
        int u = pq.top().second; // Current vertex
        int d = pq.top().first;  // Current distance
        pq.pop();

        // If current distance is greater than already found shortest, skip
        if (d > dist[u]) continue;

        // Traverse all neighbors of u
        for (auto &edge : adj[u]) {
            int v = edge.first;   // Neighbor vertex
            int w = edge.second;  // Weight of edge u -> v

            // Relaxation step
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }

    // Print shortest distances
    cout << "Vertex\tDistance from Source " << src << endl;
    for (int i = 0; i < V; i++) {
        cout << i << "\t" << dist[i] << endl;
    }
}

int main() {
    int V, E;
    cout << "Enter number of vertices and edges: ";
    cin >> V >> E;

    vector<vector<pair<int, int>>> adj(V); // adjacency list

    cout << "\nEnter edges (u v w):" << endl;
    for (int i = 0; i < E; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        adj[u].push_back({v, w});
        adj[v].push_back({u, w}); // For undirected graph
    }

    int src;
    cout << "\nEnter source vertex: ";
    cin >> src;
    cout << "\n";

    
    dijkstra(V, adj, src);

    return 0;
}
