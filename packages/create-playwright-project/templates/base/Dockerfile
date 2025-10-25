# Use the official Playwright Docker image (Ubuntu Noble with browsers pre-installed)
FROM mcr.microsoft.com/playwright:v1.56.1-noble

# Install Node.js 24
RUN apt-get update && apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_24.x | bash - && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first for layer caching
# This ensures dependencies are only reinstalled if package.json changes
COPY package*.json ./

# Install Node.js dependencies (browsers are pre-installed in the base image)
RUN npm install

# Copy the rest of the application code
COPY . .

# Ensure playwright-report directory exists for volume mounting
RUN mkdir -p /app/playwright-report

# Change ownership of the app directory to the pwuser (pre-created in Playwright image)
RUN chown -R pwuser:pwuser /app

# Create entrypoint script to handle permissions
RUN echo '#!/bin/bash\nif [ -w "/app/playwright-report" ]; then chown -R pwuser:pwuser /app/playwright-report 2>/dev/null || true; fi\nexec "$@"' > /entrypoint.sh && chmod +x /entrypoint.sh

# Switch to pwuser (non-root user pre-created in Playwright image)
USER pwuser

# Set entrypoint
ENTRYPOINT ["/entrypoint.sh"]

# Default command to run tests (can be overridden in CI)
CMD ["npm", "test"]