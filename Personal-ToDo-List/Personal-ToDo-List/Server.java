import com.sun.net.httpserver.SimpleFileServer;
import java.net.InetSocketAddress;
import java.nio.file.Path;

/**
 * Lightweight Java Web Server
 * Run with: java Server.java
 */
public class Server {
    public static void main(String[] args) {
        int[] ports = {8000, 8080, 3000};
        for (int port : ports) {
            try {
                var server = SimpleFileServer.createFileServer(
                    new InetSocketAddress(port),
                    Path.of(".").toAbsolutePath(),
                    SimpleFileServer.OutputLevel.INFO
                );
                server.start();
                System.out.println("==================================================");
                System.out.println(" Java Server is running at: http://localhost:" + port);
                System.out.println(" Press Ctrl + C to stop.");
                System.out.println("==================================================");
                return;
            } catch (Exception ignored) {
                // Try next available port
            }
        }
        System.err.println("Error: Ports 8000, 8080, and 3000 are all in use.");
    }
}
