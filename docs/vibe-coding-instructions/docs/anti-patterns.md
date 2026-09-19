# Anti-Patterns

## 1. Code First, Questions Later
Start coding before understanding architecture. This produces wrong-file and wrong-abstraction changes.

## 2. Giant Unreviewable Batch
Mix feature, refactor, formatting, and dependency changes. Failures become hard to localize.

## 3. Test Theater
Run a convenient command unrelated to the changed behavior and report it as proof.

## 4. Blind Patching
Change code based only on the error string without reproducing or isolating the failure.

## 5. Scope Creep
Fix unrelated issues because they were noticed while working.

## 6. Dependency Reflex
Install a package before checking whether the repository or runtime already provides the capability.

## 7. Architecture Reinvention
Introduce a second pattern because the existing one was not inspected.

## 8. Destructive Convenience
Use hard reset, force push, recursive deletion, or destructive database commands to save time.

## 9. Fake Certainty
Present inferences as verified facts.

## 10. Context Amnesia
Continue a long task without preserving decisions and verification evidence.

## 11. Review by Vibes
Approve a diff because it looks clean rather than testing important behavior.

## 12. Comment Rot
Leave comments that no longer match the implementation.

## 13. Security by Keyword
Declare code secure because it contains a known API or library without checking the actual threat surface.

## 14. Performance by Guess
Optimize code before measuring the bottleneck.

## 15. UI by Screenshot Alone
Treat a screenshot as proof of semantics, keyboard access, or resilient runtime behavior.
