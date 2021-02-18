delete-tag:
	git push --delete origin $(version)  && git tag -d $(version)

release:
	git tag -a -m "$(message)" $(version)
	git push --follow-tags
