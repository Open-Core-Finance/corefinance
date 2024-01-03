package tech.corefinance.common.audit;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;
import tech.corefinance.common.context.JwtContext;
import tech.corefinance.common.dto.BasicUserDto;
import tech.corefinance.common.service.JwtService;

import java.util.Optional;

@Slf4j
@Component
@ConditionalOnProperty(name = "tech.corefinance.audit.enabled.basic-user", havingValue = "true", matchIfMissing = true)
public class BasicUserAuditorAware implements AuditorAware<BasicUserDto> {

    @Autowired
    private JwtService jwtService;

    @Override
    public Optional<BasicUserDto> getCurrentAuditor() {
        var user = jwtService.retrieveUserAsAttribute(JwtContext.getInstance().getJwt());
        if (user == null) {
            log.debug("AuditorAware<BasicUserDto> retrieved null data!!");
            return Optional.empty();
        }
        log.debug("AuditorAware<BasicUserDto> got user from JwtContext.");
        return Optional.of(user);
    }
}
