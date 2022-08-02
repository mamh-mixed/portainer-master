package git

import (
	"context"
	"os"
	"path/filepath"
	"testing"

	"github.com/docker/docker/pkg/ioutils"
	"github.com/stretchr/testify/assert"
)

const (
	privateGitRepoURL string = "https://github.com/portainer/private-test-repository.git"
)

func TestService_ClonePrivateRepository_GitHub(t *testing.T) {
	ensureIntegrationTest(t)

	accessToken := getRequiredValue(t, "GITHUB_PAT")
	username := getRequiredValue(t, "GITHUB_USERNAME")
	service := NewService(context.TODO())

	dst, err := ioutils.TempDir("", "clone")
	assert.NoError(t, err)
	defer os.RemoveAll(dst)

	repositoryUrl := privateGitRepoURL
	err = service.CloneRepository(dst, repositoryUrl, "refs/heads/main", username, accessToken)
	assert.NoError(t, err)
	assert.FileExists(t, filepath.Join(dst, "README.md"))
}

func TestService_LatestCommitID_GitHub(t *testing.T) {
	ensureIntegrationTest(t)

	accessToken := getRequiredValue(t, "GITHUB_PAT")
	username := getRequiredValue(t, "GITHUB_USERNAME")
	service := NewService(context.TODO())

	repositoryUrl := privateGitRepoURL
	id, err := service.LatestCommitID(repositoryUrl, "refs/heads/main", username, accessToken)
	assert.NoError(t, err)
	assert.NotEmpty(t, id, "cannot guarantee commit id, but it should be not empty")
}

func TestService_ListRefs_GitHub(t *testing.T) {
	ensureIntegrationTest(t)

	accessToken := getRequiredValue(t, "GITHUB_PAT")
	username := getRequiredValue(t, "GITHUB_USERNAME")
	service := NewService(context.TODO())

	repositoryUrl := privateGitRepoURL
	refs, err := service.ListRefs(repositoryUrl, username, accessToken)
	assert.NoError(t, err)
	assert.GreaterOrEqual(t, len(refs), 1)
}

func TestService_ListFiles_GitHub(t *testing.T) {
	ensureIntegrationTest(t)

	accessToken := getRequiredValue(t, "GITHUB_PAT")
	username := getRequiredValue(t, "GITHUB_USERNAME")
	service := NewService(context.TODO())

	repositoryUrl := privateGitRepoURL
	paths, err := service.ListFiles(repositoryUrl, "refs/heads/main", username, accessToken, []string{})
	assert.NoError(t, err)
	assert.GreaterOrEqual(t, len(paths), 1)
}
